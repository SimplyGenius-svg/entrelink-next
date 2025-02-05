import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Welcome to EntreLink!</h2>
      {step === 1 && <p>Step 1: Let's introduce you to the platform.</p>}
      {step === 2 && <p>Step 2: Customize your profile and preferences.</p>}
      {step === 3 && <p>Step 3: Start exploring and making connections!</p>}
      {step > 3 ? (
        <p>You’ve completed the onboarding. Enjoy EntreLink!</p>
      ) : (
        <Button onClick={nextStep} className="mt-4">
          Next Step
        </Button>
      )}
    </div>
  );
};

export default Onboarding;
