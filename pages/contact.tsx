import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CheckCircleIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Seo from '../components/Seo';
import SectionHeading from '../components/SectionHeading';
import Magnetic from '../components/Magnetic';
import { socials } from '../content/site';

interface ContactProps {
  contactEmail: string | null;
}

// Formspree form endpoint for the portfolio contact form. A Formspree
// form ID is public-safe by design (it ships in the page HTML of every
// site that uses it), so it lives here as a constant — no build-time
// secrets, and no connected-account integration that can silently
// expire the way the old EmailJS setup did.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/moedvdzd';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'failure';

const inputClasses =
  'w-full rounded-lg border border-white/20 bg-surface px-4 py-3 text-zinc-100 placeholder:text-zinc-400 transition-colors focus:border-cyan-400/50 focus:outline-none';

function Contact({ contactEmail }: ContactProps) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormValues>();

  // Project cards link here with ?project=<name> (e.g. "Request the code"
  // on Drone Dispatch) — prefill the message so the request keeps its
  // context instead of landing as a bare contact form.
  useEffect(() => {
    const project = new URLSearchParams(window.location.search).get(
      'project'
    );
    if (project) {
      setValue(
        'message',
        `Hi Kevin — I'm interested in the ${project} project from your portfolio. Could I take a look at the code?`
      );
    }
  }, [setValue]);

  async function onSubmit(
    values: ContactFormValues,
    event?: BaseSyntheticEvent
  ) {
    const formElement = event?.target as HTMLFormElement | undefined;

    // Honeypot: humans never see or fill the hidden _gotcha field, so a
    // value there means a bot — quietly pretend success and drop it.
    const gotcha = formElement
      ? new FormData(formElement).get('_gotcha')
      : null;
    if (gotcha) {
      setStatus('success');
      reset();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          _subject: `New portfolio message from ${values.name}`,
        }),
      });
      if (!response.ok) {
        throw new Error(`Formspree responded ${response.status}`);
      }
      setStatus('success');
      reset();
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('failure');
    }
  }

  return (
    <>
      <Seo
        title="Contact | Kevin Kwan"
        description="Get in touch with Kevin Kwan — Software Engineer II at GEICO (conversational AI & IVR). Send a message, email directly, or connect on LinkedIn and GitHub."
        path="/contact"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Feel Free to Contact Me!"
          description="If you would like to reach out to me, leave feedback, or report a bug on my website, please fill out the form below with your name, email, and a message. I'll get back to you as soon as possible!"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Your Name"
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={inputClasses}
                {...register('name', { required: 'This field is required.' })}
              />
              {errors.name && (
                <p
                  id="contact-name-error"
                  role="alert"
                  className="mt-2 text-sm text-red-400"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Your email address
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="Your Email Address"
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={
                  errors.email ? 'contact-email-error' : undefined
                }
                className={inputClasses}
                {...register('email', {
                  required: 'This field is required.',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please provide a valid email address.',
                  },
                })}
              />
              {errors.email && (
                <p
                  id="contact-email-error"
                  role="alert"
                  className="mt-2 text-sm text-red-400"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Your message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                placeholder="Your Message"
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={
                  errors.message ? 'contact-message-error' : undefined
                }
                className={inputClasses}
                {...register('message', {
                  required: 'This field is required.',
                  minLength: {
                    value: 10,
                    message: 'Your message must be at least 10 characters.',
                  },
                })}
              />
              {errors.message && (
                <p
                  id="contact-message-error"
                  role="alert"
                  className="mt-2 text-sm text-red-400"
                >
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Honeypot spam trap — hidden from people, filled by bots. */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <Magnetic className="w-full sm:w-auto">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </Magnetic>

            <div aria-live="polite">
              {status === 'success' && (
                <p className="flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                  <CheckCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  Successfully submitted form! Thanks for reaching out.
                </p>
              )}
              {status === 'failure' && (
                <p className="flex items-center gap-2 rounded-lg border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  <ExclamationCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  Failed to submit form. Please try again later, or email me
                  directly.
                </p>
              )}
            </div>
          </form>

          <aside className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
              Or reach me directly
            </h2>
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface px-4 py-4 transition-colors duration-200 hover:border-white/25"
              >
                <EnvelopeIcon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-medium text-zinc-100">
                    Email
                  </span>
                  <span className="block break-all text-sm text-zinc-400">
                    {contactEmail}
                  </span>
                </span>
              </a>
            )}
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface px-4 py-4 transition-colors duration-200 hover:border-white/25"
            >
              <FaLinkedin className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <span>
                <span className="block text-sm font-medium text-zinc-100">
                  LinkedIn
                </span>
                <span className="block text-sm text-zinc-400">
                  linkedin.com/in/kevinkwan3
                </span>
              </span>
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface px-4 py-4 transition-colors duration-200 hover:border-white/25"
            >
              <FaGithub className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <span>
                <span className="block text-sm font-medium text-zinc-100">
                  GitHub
                </span>
                <span className="block text-sm text-zinc-400">
                  github.com/Kevin-Kwan
                </span>
              </span>
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null;

  return {
    props: {
      contactEmail,
    },
  };
}

export default Contact;
