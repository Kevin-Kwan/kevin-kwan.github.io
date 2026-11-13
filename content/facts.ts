/**
 * Canonical GEICO production figures — the single source every surface
 * (home metrics band, expertise stats, /experience metric strip) reads
 * from, so a number can never drift between pages. Long-form prose
 * (experience bullets, pipeline metrics) still spells figures out in
 * sentences; the values here are the display strings those surfaces use.
 */
export const geicoFacts = {
  /** Sierra AI billing agent weekly run-rate, October 2026. */
  callsPerWeek: '~30K',
  /** Long form of `callsPerWeek`, spelled out for prose-style surfaces. */
  callsPerWeekLong: '~30,000',
  /** Numeric target matching `callsPerWeek` for count-up animations. */
  callsPerWeekCount: 30,
  /** Sierra conversations handled, May–Oct 2026. */
  conversations: '436K+',
  /** Exact conversation count behind `conversations`. */
  conversationsExact: '436,112',
  /** Numeric target matching `conversations` for count-up animations. */
  conversationsCount: 436,
  /** Share contained without a live-agent transfer. */
  containment: '~51%',
  /** Legacy payment IVR containment, pre-Sierra. */
  paymentIvrContainment: '~60%',
  /** Make-payment flow completions. */
  payments: '22,600+',
  /** Numeric target matching `payments` for count-up animations. */
  paymentsCount: 22600,
  /** Payment authorization success range. */
  paymentsSuccess: '92–95%',
  /** Reschedules completed through the billing agent. */
  reschedules: '82,800',
  /** Informational answers served by the billing agent. */
  informationalAnswers: '192,000',
  /** Informational-answer tool success rate. */
  toolSuccess: '98%',
  /** Production and UT1 bugs fixed, of those filed. */
  bugsFixed: '86 of 91',
  /** Proof of Coverage IVR containment. */
  pocContainment: '~80%',
  /** Numeric target matching `pocContainment` for count-up animations. */
  pocContainmentCount: 80,
} as const;
