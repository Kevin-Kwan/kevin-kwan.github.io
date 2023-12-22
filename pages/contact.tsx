import React, { useRef, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Head from 'next/head';
import Layout from '../components/RootLayout';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineClose,
} from 'react-icons/ai';

interface ContactProps {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export default function Contact({
  serviceId,
  templateId,
  publicKey,
}: ContactProps) {
  const form = useRef<HTMLFormElement>(null);
  const [submitResult, setSubmitResult] = useState<
    'success' | 'failure' | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (!serviceId || !templateId || !publicKey || !form.current) {
      console.error(
        'EmailJS environment variables or form reference are not defined'
      );
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
      setSubmitResult('success');
      setIsModalOpen(true);
      reset();
    } catch (error) {
      setSubmitResult('failure');
      setIsModalOpen(true);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Kevin Kwan | Contact Form</title>
      </Head>
      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-white text-2xl font-bold mb-4 text-center">
            Feel Free to Contact Me!
          </p>
          <p className="text-white mb-4">
            If you would like to reach out to me or report a bug on my website,
            please fill out the form below with your name, email, and a message.
            <br />
            You can also directly email me at{' '}
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL ? (
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                className="text-blue-400 underline"
              >
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
              </a>
            ) : (
              '(Fetching email address...)'
            )}
            <a>.</a>
            <br />
            <br />
            I&lsquo;ll get back to you as soon as possible!
          </p>
          <form
            ref={form}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <input
              {...register('name', { required: true })}
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
            {errors.name && (
              <span className="text-red-500">This field is required.</span>
            )}

            <input
              {...register('email', {
                required: 'This field is required.',
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please provide a valid email address.',
                },
              })}
              placeholder="Your Email Address"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
            {errors.email && typeof errors.email.message === 'string' && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            <textarea
              {...register('message', {
                required: 'This field is required.',
                minLength: {
                  value: 10,
                  message: 'Your message must be at least 10 characters.',
                },
              })}
              placeholder="Your Message"
              className="w-full p-2 border border-gray-300 rounded text-black"
              rows={4}
            />
            {errors.message && typeof errors.message.message === 'string' && (
              <span className="text-red-500">{errors.message.message}</span>
            )}

            <input
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
            />
          </form>
        </div>
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className={`p-8 rounded shadow-lg relative flex items-center justify-center ${
              submitResult === 'success' ? 'bg-green-200' : 'bg-red-200'
            }`}
          >
            {' '}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
            >
              <AiOutlineClose size={24} />
            </button>
            <div className="">
              {submitResult === 'success' && (
                <div className="flex flex-col items-center justify-center">
                  <AiOutlineCheckCircle
                    className="text-green-500 animate-bounce"
                    size={50}
                  />
                  <p className="text-green-900 text-lg font-bold text-center">
                    Successfully submitted form!
                  </p>
                </div>
              )}
              {submitResult === 'failure' && (
                <div className="flex flex-col items-center justify-center">
                  <AiOutlineCloseCircle
                    className="text-red-500 animate-bounce"
                    size={50}
                  />
                  <p className="text-red-500 text-lg font-bold text-center">
                    Failed to submit form. Please try again later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  return {
    props: {
      serviceId,
      templateId,
      publicKey,
    },
  };
}

export const runtime = 'edge';
