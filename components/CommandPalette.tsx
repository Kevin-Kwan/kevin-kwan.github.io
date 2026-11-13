import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { navLinks, resumeUrl, site } from '../content/site';
import {
  projectCategoryLabels,
  type ProjectCategory,
} from '../content/projects';

interface PaletteAction {
  id: string;
  label: string;
  /** Small right-aligned context text (page group, email, file name…). */
  hint?: string;
  run: () => void | Promise<void>;
}

/**
 * Site-wide command palette, opened with Cmd+K / Ctrl+K from any page.
 * Actions jump to pages, open /projects with a category filter applied,
 * download the résumé, or copy the contact email. Hand-rolled on the
 * existing stack — no extra dependency — with listbox semantics: the
 * input keeps focus and drives the active option via aria-activedescendant.
 */
function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);

  const actions = useMemo<PaletteAction[]>(() => {
    const items: PaletteAction[] = navLinks.map((link) => ({
      id: `page-${link.href}`,
      label: link.label,
      hint: 'Page',
      run: () => {
        void router.push(link.href);
      },
    }));

    items.push(
      {
        id: 'projects-featured',
        label: 'Featured projects',
        hint: 'Projects',
        run: () => {
          void router.push({
            pathname: '/projects',
            query: { category: 'featured' },
          });
        },
      },
      ...(Object.keys(projectCategoryLabels) as ProjectCategory[]).map(
        (id) => ({
          id: `projects-${id}`,
          label: projectCategoryLabels[id],
          hint: 'Projects',
          run: () => {
            void router.push({
              pathname: '/projects',
              query: { category: id },
            });
          },
        })
      ),
      {
        id: 'download-resume',
        label: 'Download résumé',
        hint: site.resumeFileName,
        run: () => {
          const link = document.createElement('a');
          link.href = resumeUrl;
          link.download = site.resumeFileName;
          document.body.appendChild(link);
          link.click();
          link.remove();
        },
      },
      {
        id: 'copy-email',
        label: 'Copy contact email',
        hint: site.contactEmail,
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.contactEmail);
          } catch {
            // Clipboard unavailable (permissions / insecure context) —
            // the address stays visible in the hint either way.
          }
        },
      }
    );

    return items;
  }, [router]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return actions;
    return actions.filter((action) =>
      `${action.label} ${action.hint ?? ''}`.toLowerCase().includes(needle)
    );
  }, [actions, query]);

  const openPalette = useCallback(() => {
    restoreFocusRef.current = document.activeElement;
    setQuery('');
    setActiveIndex(0);
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    const target = restoreFocusRef.current;
    restoreFocusRef.current = null;
    if (target instanceof HTMLElement) target.focus();
  }, []);

  // Cmd+K / Ctrl+K toggles the palette from anywhere on the site.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault();
        if (open) {
          closePalette();
        } else {
          openPalette();
        }
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, openPalette, closePalette]);

  // Focus the search input as soon as the palette opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open ]);

  // Keep the active option visible while arrow-keying through the list.
  useEffect(() => {
    if (!open) return;
    const option = document.getElementById(
      `command-palette-option-${activeIndex}`
    );
    option?.scrollIntoView?.({ block: 'nearest' });
  }, [open, activeIndex]);

  function runAction(action: PaletteAction) {
    closePalette();
    void action.run();
  }

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) =>
          Math.min(index + 1, Math.max(visible.length - 1, 0))
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (visible[activeIndex]) runAction(visible[activeIndex]);
        break;
      case 'Escape':
        event.preventDefault();
        closePalette();
        break;
      default:
        break;
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close command palette"
        tabIndex={-1}
        onClick={closePalette}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-surface-raised shadow-2xl shadow-black/60"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <MagnifyingGlassIcon
            className="h-5 w-5 shrink-0 text-zinc-500"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Jump to a page, filter projects, run an action…"
            aria-label="Command palette search"
            aria-controls="command-palette-list"
            aria-activedescendant={
              visible.length > 0
                ? `command-palette-option-${activeIndex}`
                : undefined
            }
            className="h-12 w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          <kbd className="shrink-0 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] uppercase text-zinc-500">
            esc
          </kbd>
        </div>
        {visible.length > 0 ? (
          <ul
            id="command-palette-list"
            role="listbox"
            aria-label="Commands"
            className="max-h-80 overflow-y-auto p-2"
          >
            {visible.map((action, index) => (
              <li
                key={action.id}
                id={`command-palette-option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => runAction(action)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  index === activeIndex
                    ? 'bg-violet-400/15 text-zinc-50'
                    : 'text-zinc-300'
                }`}
              >
                <span className="min-w-0 flex-1 truncate">{action.label}</span>
                {action.hint && (
                  <span className="shrink-0 text-xs text-zinc-500">
                    {action.hint}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-6 text-center text-sm text-zinc-500">
            No matching commands.
          </p>
        )}
      </div>
    </div>
  );
}

export default CommandPalette;
