"use client";
import { useCallback, useMemo, useReducer, useState } from "react";
import { validate } from "./validateWizard";
import { INITIAL_FORM } from "./constants";

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.key]: action.value };
    case "TOGGLE_NEED":
      return state.needs.includes(action.value)
        ? { ...state, needs: state.needs.filter((n) => n !== action.value) }
        : { ...state, needs: [...state.needs, action.value] };
    case "RESET":
      return INITIAL_FORM;
    default:
      return state;
  }
}

export function useContactWizard() {
  const [form, dispatch] = useReducer(reducer, INITIAL_FORM);
  const [step, setStep] = useState(1); // 1..3
  const [submitting, setSubmitting] = useState(false);
  const [showErr, setShowErr] = useState({ 1: false, 2: false, 3: false });

  const setField = useCallback((key, value) => {
    dispatch({ type: "SET_FIELD", key, value });
  }, []);

  const toggleNeed = useCallback((value) => {
    dispatch({ type: "TOGGLE_NEED", value });
  }, []);

  const errors = useMemo(() => validate(step, form), [step, form]);
  const canNext = Object.keys(errors).length === 0;

  const goNext = useCallback(() => {
    if (!canNext) {
      setShowErr((s) => ({ ...s, [step]: true }));
      return;
    }
    setStep((s) => (s < 3 ? s + 1 : s));
    setShowErr((s) => ({ ...s, [step]: false }));
  }, [canNext, step]);

  const goBack = useCallback(() => setStep((s) => (s > 1 ? s - 1 : s)), []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (step !== 3 || !canNext) {
        setShowErr((s) => ({ ...s, 3: true }));
        return;
      }
      setSubmitting(true);
      try {
        // TODO: replace with real endpoint
        console.log("Submit payload:", form);
        alert("Thanks! We’ll get back to you shortly.");
        setStep(1);
        dispatch({ type: "RESET" });
        setShowErr({ 1: false, 2: false, 3: false });
      } finally {
        setSubmitting(false);
      }
    },
    [step, canNext, form]
  );

  return {
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
  };
}
