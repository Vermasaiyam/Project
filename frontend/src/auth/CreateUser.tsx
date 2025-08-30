import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUserSchema } from "@/schema/userSchema";
import type { CreateUserInputState } from "@/schema/userSchema";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore"
import { Loader2 } from "lucide-react";

const steps = [
  "Basic Info",
  "Job Details",
  "Identity",
  "Education",
  "Employment History",
  "Salary Account",
  "Dependents",
  "Leave Balance"
];

const CreateUser = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CreateUserInputState>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createUser, loading } = useUserStore();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    let schema;
    if (step === 0) {
      schema = createUserSchema.pick({
        employeeCode: true,
        firstName: true,
        lastName: true,
        personalEmail: true,
        workEmail: true,
        password: true,
        contactNumber: true,
        address: true,
        city: true,
        country: true,
      });
    } else if (step === 1) {
      schema = createUserSchema.pick({
        dateOfJoining: true,
        department: true,
        designation: true,
        employmentType: true,
      });
    } else if (step === 2) {
      schema = createUserSchema.pick({
        aadharCardNumber: true,
        panCardNumber: true,
      });
    }

    if (!schema) return true;

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Record<string, string>);
      return false;
    }
    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const submitHandler = async () => {
    const result = createUserSchema.safeParse(formData);
    if (!result.success) {
      console.log("Validation failed", result.error.format());
      return;
    }
    console.log("Final Data:", result.data);
    try {
      await createUser(formData as CreateUserInputState);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Employee</h1>
      <p className="mb-4">Step {step + 1} of {steps.length}: {steps[step]}</p>

      {/* Step forms */}
      {step === 0 && (
        <div className="space-y-4">
          <Input name="employeeCode" placeholder="Employee Code *" onChange={handleChange} />
          {errors.employeeCode && <p className="text-red-500 text-sm">{errors.employeeCode}</p>}
          <Input name="firstName" placeholder="First Name *" onChange={handleChange} />
          <Input name="lastName" placeholder="Last Name *" onChange={handleChange} />
          <Input name="personalEmail" placeholder="Personal Email *" type="email" onChange={handleChange} />
          <Input name="workEmail" placeholder="Work Email *" type="email" onChange={handleChange} />
          <Input name="password" placeholder="Password *" type="password" onChange={handleChange} />
          <Input name="contactNumber" placeholder="Contact Number *" onChange={handleChange} />
          <Input name="address" placeholder="Address *" onChange={handleChange} />
          <Input name="city" placeholder="City *" onChange={handleChange} />
          <Input name="country" placeholder="Country *" onChange={handleChange} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Input name="dateOfJoining" type="date" placeholder="Date of Joining *" onChange={handleChange} />
          <Input name="department" placeholder="Department *" onChange={handleChange} />
          <Input name="designation" placeholder="Designation *" onChange={handleChange} />
          <Input name="employmentType" placeholder="Employment Type (Full-time, Part-time, Intern, Contract) *" onChange={handleChange} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Input name="aadharCardNumber" placeholder="Aadhar Card Number *" onChange={handleChange} />
          <Input name="panCardNumber" placeholder="PAN Card Number *" onChange={handleChange} />
        </div>
      )}

      {/* Example for optional step */}
      {step === 3 && (
        <div className="space-y-4">
          <Input name="qualification" placeholder="Qualification (optional)" onChange={handleChange} />
          <Button onClick={nextStep}>Skip</Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4 mt-6">
        {step > 0 && <Button onClick={prevStep} variant="outline">Back</Button>}
        {step < steps.length - 1 && <Button onClick={nextStep}>Next</Button>}
        {step === steps.length - 1 && (
          loading ? (
            <Button disabled className="w-full bg-green hover:bg-hoverGreen dark:text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-green hover:bg-hoverGreen dark:text-white"
              onClick={submitHandler}
            >
              Login
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default CreateUser;