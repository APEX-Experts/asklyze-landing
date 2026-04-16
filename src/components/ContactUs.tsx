"use client";

import React, { useState } from "react";
import LinkButton from "./LinkButton";
import Link from "next/link";
import { COUNTRIES, getFlagEmoji } from "../lib/countries";
import CustomSelect from "./CustomSelect";
import Field from "./Field";
import InfoBlock from "./InfoBlock";
import Separator from "./Separator";

type FormField = {
  label: string;
  placeholder: string;
  required?: string;
  invalid?: string;
  countrySelect?: boolean;
  options?: string[];
  textarea?: boolean;
};

type Props = {
  dict: {
    title: string;
    subtitle: string;
    locationLabel: string;
    location1: string;
    location2: string;
    emailLabel: string;
    email1: string;
    email2: string;
    callLabel: string;
    phone1: string;
    phone2: string;
    callTimes: string;
    form: {
      name: FormField;
      email: FormField;
      country: FormField;
      phone: FormField;
      companyName: FormField;
      companySize: FormField;
      role: FormField;
      subject: FormField;
      message: FormField;
      submit: string;
    };
  };
  lang?: string;
};

const PIN_SVG = (
  <svg
    width="22"
    height="22"
    className="text-primary shrink-0 mt-0.5"
    viewBox="0 0 12 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8031 2.8933C9.77849 1.12374 7.95848 0.0426521 5.93462 0.0013365C5.84822 -0.0004455 5.76126 -0.0004455 5.67483 0.0013365C3.65101 0.0426521 1.83103 1.12374 0.80636 2.8933C-0.241004 4.70205 -0.269658 6.87472 0.729691 8.70523L4.91633 16.3738C4.91821 16.3772 4.92009 16.3806 4.92204 16.3839C5.10625 16.7043 5.43623 16.8956 5.80479 16.8956C6.17332 16.8956 6.5033 16.7043 6.68748 16.3839C6.68942 16.3806 6.6913 16.3772 6.69318 16.3738L10.8799 8.70523C11.8791 6.87472 11.8504 4.70205 10.8031 2.8933ZM5.80472 7.65585C4.49557 7.65585 3.4305 6.59 3.4305 5.27989C3.4305 3.9698 4.49557 2.90395 5.80472 2.90395C7.11387 2.90395 8.17897 3.9698 8.17897 5.27989C8.17897 6.59 7.11391 7.65585 5.80472 7.65585Z"
      fill="#3A4A8A"
    />
  </svg>
);

const MAIL_SVG = (
  <svg
    width="22"
    className="text-primary shrink-0 mt-0.5"
    height="22"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_408_270)">
      <mask
        id="mask0_408_270"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="18"
        height="18"
      >
        <path
          d="M17.3581 0.187988H0.471924V17.0836H17.3581V0.187988Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_408_270)">
        <path
          d="M17.3444 3.82818C17.3444 3.80887 17.3577 3.79008 17.3568 3.771L12.2053 8.73904L17.3506 13.5483C17.3537 13.514 17.3444 13.4794 17.3444 13.4443V3.82818Z"
          fill="#3A4A8A"
        />
        <path
          d="M11.4185 9.50391L9.315 11.529C9.20855 11.6315 9.07107 11.6829 8.93353 11.6829C8.79884 11.6829 8.66415 11.6337 8.55845 11.5351L6.46068 9.57908L1.28052 14.5753C1.40648 14.6206 1.54168 14.6558 1.68327 14.6558H16.1838C16.3941 14.6558 16.5913 14.5917 16.7628 14.4961L11.4185 9.50391Z"
          fill="#3A4A8A"
        />
        <path
          d="M8.92515 10.3745L16.7889 2.79465C16.6109 2.68873 16.4037 2.61768 16.1815 2.61768H1.6809C1.39164 2.61768 1.1266 2.73005 0.920166 2.90146L8.92515 10.3745Z"
          fill="#3A4A8A"
        />
        <path
          d="M0.471924 4.0127V13.4441C0.471924 13.5523 0.496786 13.6567 0.523776 13.7565L5.6384 8.82689L0.471924 4.0127Z"
          fill="#3A4A8A"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_408_270">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PHONE_SVG = (
  <svg
    className="text-primary shrink-0 mt-0.5"
    width="22"
    height="22"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_408_299)">
      <path
        d="M13.3093 11.3125C12.7577 10.7675 12.069 10.7675 11.5209 11.3125C11.1028 11.7274 10.6847 12.1423 10.2736 12.5641C10.1611 12.6801 10.0662 12.7048 9.92922 12.6274C9.65867 12.4798 9.37056 12.3602 9.11055 12.1985C7.89835 11.4355 6.88293 10.4546 5.98345 9.35067C5.53721 8.80219 5.14018 8.21506 4.86261 7.55407C4.80638 7.42048 4.81692 7.33258 4.92584 7.22359C5.34396 6.81927 5.75155 6.4044 6.16264 5.98954C6.73535 5.41295 6.73535 4.73791 6.15913 4.1578C5.83236 3.82731 5.50559 3.50386 5.17882 3.17337C4.84153 2.83585 4.50773 2.49481 4.16691 2.16081C3.61527 1.62289 2.92661 1.62289 2.37848 2.16433C1.95684 2.5792 1.55279 3.00461 1.12413 3.41244C0.727087 3.78864 0.526813 4.24921 0.484649 4.78713C0.41789 5.66257 0.632221 6.48879 0.934391 7.29391C1.55279 8.9604 2.49443 10.4406 3.63636 11.7977C5.17882 13.6329 7.01995 15.0849 9.1738 16.1326C10.1435 16.6038 11.1484 16.9659 12.2412 17.0257C12.993 17.0678 13.6467 16.8781 14.1701 16.2909C14.5286 15.8901 14.9327 15.5245 15.3121 15.1412C15.8743 14.5717 15.8778 13.8825 15.3191 13.32C14.6515 12.6485 13.9805 11.9805 13.3093 11.3125Z"
        fill="#3A4A8A"
      />
      <path
        d="M12.6387 8.51073L13.9348 8.28923C13.731 7.09737 13.169 6.01801 12.3155 5.16015C11.4126 4.25659 10.271 3.68702 9.01348 3.51123L8.83081 4.8156C9.80385 4.95272 10.6891 5.3922 11.3881 6.09185C12.0485 6.75282 12.4806 7.58958 12.6387 8.51073Z"
        fill="#3A4A8A"
      />
      <path
        d="M14.6612 2.87154C13.1645 1.3738 11.2709 0.428043 9.18049 0.13623L8.9978 1.4406C10.8036 1.69373 12.4408 2.51293 13.7337 3.80323C14.9599 5.03025 15.7644 6.58072 16.056 8.2859L17.3524 8.06441C17.0115 6.08851 16.0806 4.29544 14.6612 2.87154Z"
        fill="#3A4A8A"
      />
    </g>
    <defs>
      <clipPath id="clip0_408_299">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

type FormValues = {
  name: string;
  email: string;
  country: string;
  phone: string;
  companyName: string;
  companySize: string;
  role: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const inputBase =
  "w-full rounded-sm border border-gray-200 bg-transparent px-4 py-3 text-sm text-text-heading placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200";

const ContactUs = ({ dict, lang }: Props) => {
  const isArabic = lang === "ar";
  const f = dict.form;

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    country: "",
    phone: "",
    companyName: "",
    companySize: "",
    role: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!values.name.trim() && f.name.required) errs.name = f.name.required;
    if (!values.email.trim() && f.email.required) errs.email = f.email.required;
    else if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      errs.email = f.email.invalid ?? "Invalid email";
    if (!values.country.trim() && f.country.required)
      errs.country = f.country.required;
    if (!values.companyName.trim() && f.companyName.required)
      errs.companyName = f.companyName.required;
    if (!values.companySize.trim() && f.companySize.required)
      errs.companySize = f.companySize.required;
    if (!values.role.trim() && f.role.required) errs.role = f.role.required;
    if (!values.subject.trim() && f.subject.required)
      errs.subject = f.subject.required;
    if (!values.message.trim() && f.message.required)
      errs.message = f.message.required;

    if (values.phone.trim()) {
      const cleanPhone = values.phone.replace(/[\s\-()]/g, "");
      if (!/^\d{7,15}$/.test(cleanPhone)) {
        errs.phone = f.phone.invalid ?? "Invalid phone";
      }
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    try {
      const payload = {
        ...values,
        phoneCode: countryDialCode,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMessage(data.message ?? "Message sent!");
        setValues({
          name: "",
          email: "",
          country: "",
          phone: "",
          companyName: "",
          companySize: "",
          role: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
        setServerMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please try again.");
    }
  };

  const countryOptions = COUNTRIES.map((c) => ({
    label: isArabic ? c.arName : c.name,
    value: c.name,
    searchStr: `${isArabic ? c.arName : c.name} ${c.dial_code}`,
    leftIcon: (
      <span className="text-xl leading-none">{getFlagEmoji(c.code)}</span>
    ),
  }));
  const countryDialCode =
    COUNTRIES.find((c) => c.name === values.country)?.dial_code || "";

  return (
    <section id="contact" className="py-12 md:py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-full flex flex-col items-center mx-auto bg-bg-card rounded-5xl gap-10 justify-center py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="text-3xl lg:text-[40px] font-bold text-primary-dark">
            {dict.title}
          </h2>
          <p className="text-text-body max-w-xl">{dict.subtitle}</p>
        </div>

        {/* Two-column content */}
        <div className="w-full flex flex-row max-lg:flex-wrap gap-10 items-start">
          {/* ── LEFT: Contact info ── */}
          <div className="flex flex-col gap-4 bg-white/80 p-6 rounded-3xl border-white max-w-[360px]">
            {/* Location */}
            <InfoBlock label={dict.locationLabel}>
              <div className="flex gap-2.5 items-start">
                <div className="shrink-0">{PIN_SVG}</div>
                <p className="text-primary-300 leading-[130%] capitalize">
                  {dict.location1}
                </p>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="shrink-0">{PIN_SVG}</div>
                <p className="text-primary-300 leading-[130%] capitalize">
                  {dict.location2}
                </p>
              </div>
            </InfoBlock>

            <Separator />

            {/* Email */}
            <InfoBlock label={dict.emailLabel}>
              <div className="flex gap-2.5 items-center">
                <div className="shrink-0">{MAIL_SVG}</div>
                <Link
                  href={`mailto:${dict.email1}`}
                  className="text-primary-300"
                >
                  {dict.email1}
                </Link>
              </div>
              <div className="flex gap-2.5 items-center">
                <div className="shrink-0">{MAIL_SVG}</div>
                <Link
                  href={`mailto:${dict.email2}`}
                  className="text-primary-300"
                >
                  {dict.email2}
                </Link>
              </div>
            </InfoBlock>

            <Separator />

            {/* Phone */}
            <InfoBlock label={dict.callLabel}>
              <div className="flex gap-2.5 items-center">
                <div className="shrink-0">{PHONE_SVG}</div>
                <Link
                  href={`tel:${dict.phone1}`}
                  className="text-primary-300"
                  dir="ltr"
                >
                  {dict.phone1}
                </Link>
              </div>
              <div className="flex gap-2.5 items-center">
                <div className="shrink-0">{PHONE_SVG}</div>
                <Link
                  href={`tel:${dict.phone2}`}
                  className="text-primary-300"
                  dir="ltr"
                >
                  {dict.phone2}
                </Link>
              </div>
              <p className="text-sm leading-[162.5%] text-text-heading mt-1">
                {dict.callTimes}
              </p>
            </InfoBlock>
          </div>

          {/* ── RIGHT: Form ── */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4 flex-1 bg-white/80 border-white rounded-3xl p-6"
          >
            {/* Row: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label={f.name.label}
                error={errors.name}
                required={!!f.name.required}
              >
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder={f.name.placeholder}
                  value={values.name}
                  onChange={handleChange}
                  className={inputBase}
                />
              </Field>
              <Field
                label={f.email.label}
                error={errors.email}
                required={!!f.email.required}
              >
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder={f.email.placeholder}
                  value={values.email}
                  onChange={handleChange}
                  className={inputBase}
                />
              </Field>
            </div>

            {/* Row: Country + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label={f.country.label}
                error={errors.country}
                required={!!f.country.required}
              >
                <CustomSelect
                  options={countryOptions}
                  value={values.country}
                  onChange={(val) =>
                    setValues((prev) => ({ ...prev, country: val }))
                  }
                  placeholder={f.country.placeholder}
                  searchable
                />
              </Field>
              <Field
                label={f.phone.label}
                error={errors.phone}
                required={!!f.phone.required}
              >
                <div className="relative flex items-center w-full" dir="ltr">
                  {countryDialCode && (
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 pb-0.5 text-gray-500 font-medium text-sm select-none pointer-events-none">
                      {countryDialCode}
                    </div>
                  )}
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder={f.phone.placeholder}
                    value={values.phone}
                    onChange={handleChange}
                    className={inputBase}
                    style={
                      countryDialCode
                        ? {
                            paddingLeft: `${32 + countryDialCode.length * 8}px`,
                          }
                        : {}
                    }
                  />
                </div>
              </Field>
            </div>

            {/* Row: Company Name + Company Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label={f.companyName.label}
                error={errors.companyName}
                required={!!f.companyName.required}
              >
                <input
                  id="contact-company-name"
                  name="companyName"
                  type="text"
                  placeholder={f.companyName.placeholder}
                  value={values.companyName}
                  onChange={handleChange}
                  className={inputBase}
                />
              </Field>
              <Field
                label={f.companySize.label}
                error={errors.companySize}
                required={!!f.companySize.required}
              >
                <CustomSelect
                  options={(f.companySize.options ?? []).map((opt) => ({
                    label: opt,
                    value: opt,
                  }))}
                  value={values.companySize}
                  onChange={(val) =>
                    setValues((prev) => ({ ...prev, companySize: val }))
                  }
                  placeholder={f.companySize.placeholder}
                />
              </Field>
            </div>

            {/* Row: Role + Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label={f.role.label}
                error={errors.role}
                required={!!f.role.required}
              >
                <input
                  id="contact-role"
                  name="role"
                  type="text"
                  placeholder={f.role.placeholder}
                  value={values.role}
                  onChange={handleChange}
                  className={inputBase}
                />
              </Field>
              <Field
                label={f.subject.label}
                error={errors.subject}
                required={!!f.subject.required}
              >
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder={f.subject.placeholder}
                  value={values.subject}
                  onChange={handleChange}
                  className={inputBase}
                />
              </Field>
            </div>

            {/* Message */}
            <Field
              label={f.message.label}
              error={errors.message}
              required={!!f.message.required}
            >
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder={f.message.placeholder}
                value={values.message}
                onChange={handleChange}
                className={`${inputBase} resize-none bg-transparent`}
              />
            </Field>

            {/* Status feedback */}
            {status === "success" && (
              <p className="text-sm text-green-600 font-medium">
                {serverMessage}
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500 font-medium">
                {serverMessage}
              </p>
            )}

            {/* Submit button — centered, normal width */}
            <div className="flex justify-center">
              <LinkButton type="submit" variant="primary">
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  f.submit
                )}
              </LinkButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
