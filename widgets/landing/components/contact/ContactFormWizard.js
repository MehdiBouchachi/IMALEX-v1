"use client";
import React from "react";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { StepThree } from "./steps/StepThree";
import { WizardProgress } from "./WizardProgress";
import Button from "../../../ui/Button";
import SendStatus from "../../../ui/SendStatus";
import { useContactWizard } from "./useContactWizard";
import { PROGRESS_LABELS, TOTAL_STEPS } from "./constants";

export default function ContactFormWizard() {
  const {
    step,
    canNext,
    submitting,
    showErr,
    errors,
    form,
    setField,
    toggleNeed,
    goNext,
    goBack,
    onSubmit,
    statusOpen,
    closeStatus,
    retry,
    statusVariant,
    statusMessage,
    statusDetails,
  } = useContactWizard();

  const pages = [
    <StepOne
      key="s1"
      form={form}
      setField={setField}
      errors={showErr[1] ? errors : {}}
      disabled={submitting}
    />,
    <StepTwo
      key="s2"
      form={form}
      setField={setField}
      toggleNeed={toggleNeed}
      errors={showErr[2] ? errors : {}}
      disabled={submitting}
    />,
    <StepThree
      key="s3"
      form={form}
      setField={setField}
      errors={showErr[3] ? errors : {}}
      disabled={submitting}
    />,
  ];

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="rounded-2xl p-6 backdrop-blur-sm border bg-[var(--contact-panel-bg)] border-[var(--contact-panel-border)]"
      >
        <WizardProgress
          step={step}
          labels={PROGRESS_LABELS}
          total={TOTAL_STEPS}
        />

        <div className="mt-6 space-y-6">{pages[step - 1]}</div>
        <input
          type="text"
          name="company"
          value={form.company || ""}
          onChange={(e) => setField("company", e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            size="md"
            type="button"
            onClick={goBack}
            disabled={step === 1}
          >
            Back
          </Button>

          {step < pages.length ? (
            <Button
              variant="primary"
              size="md"
              type="button"
              onClick={goNext}
              aria-disabled={!canNext}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              type="submit"
              loading={submitting}
              disabled={submitting || !canNext}
            >
              Send inquiry
            </Button>
          )}
        </div>
      </form>

      <SendStatus
        open={statusOpen}
        variant={statusVariant}
        message={statusMessage}
        details={statusDetails}
        onClose={closeStatus}
        onRetry={retry}
      />
    </>
  );
}
