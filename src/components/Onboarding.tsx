import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <p>Step 1: Let&apos;s introduce you to the platform.</p>;
      case 2:
        return <p>Step 2: Customize your profile and preferences.</p>;
      case 3:
        return <p>Step 3: Start exploring and making connections!</p>;
      default:
        return <p>You’ve completed the onboarding. Enjoy EntreLink!</p>;
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Welcome to EntreLink!</h2>
      {renderStepContent()}
      {step <= 3 && (
        <Button onClick={nextStep} className="mt-4">
          Next Step
        </Button>
      )}
    </div>
  );
};

export default Onboarding;
