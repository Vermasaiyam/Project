import React, { useState } from "react";
import { Loader2, User, Briefcase, Shield, GraduationCap, Building, CreditCard, Users, Calendar, CheckCircle2, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createUserSchema, type CreateUserInputState } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";

type FormData = {
  [key: string]: any;
  employeeCode?: string;
  firstName?: string;
  lastName?: string;
  workEmail?: string;
  department?: string;
};

type FormErrors = {
  [key: string]: string;
};

interface Step {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

const steps: Step[] = [
  { id: "basic", title: "Basic Info", icon: User, description: "Personal details" },
  { id: "job", title: "Job Details", icon: Briefcase, description: "Role & department" },
  { id: "identity", title: "Identity", icon: Shield, description: "Verification docs" },
  { id: "education", title: "Education", icon: GraduationCap, description: "Qualifications" },
  { id: "employment", title: "Employment", icon: Building, description: "Work history" },
  { id: "salary", title: "Salary Account", icon: CreditCard, description: "Banking details" },
  { id: "dependents", title: "Dependents", icon: Users, description: "Family info" },
  { id: "leave", title: "Leave Balance", icon: Calendar, description: "Time off setup" }
];

interface InputFieldProps {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  icon?: LucideIcon;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
  [key: string]: any;
}

const InputField = ({ name, placeholder, type = "text", required = false, icon: Icon, value, onChange, errors, ...props }: InputFieldProps) => (
  <div className="group">
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600`}
        {...props}
      />
      {required && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span className="text-red-400 text-sm">*</span>
        </div>
      )}
    </div>
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1 animate-in slide-in-from-top-1">{errors[name]}</p>
    )}
  </div>
);

const CreateUser = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const { createUser, loading } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
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
    } else if (step === 5) {
      // Salary Account validation - only for required fields
      const requiredFields = ['bankName', 'accountNumber', 'ifscCode', 'branchName'];
      const hasRequiredFields = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
      if (!hasRequiredFields) {
        setErrors({ 
          bankName: !formData.bankName ? 'Bank name is required' : '',
          accountNumber: !formData.accountNumber ? 'Account number is required' : '',
          ifscCode: !formData.ifscCode ? 'IFSC code is required' : '',
          branchName: !formData.branchName ? 'Branch name is required' : ''
        });
        return false;
      }
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

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = createUserSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Record<string, string>);
      console.log("Validation failed", result.error.format());
      return;
    }

    try {
      await createUser(formData as CreateUserInputState);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">HR Portal</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create New Employee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {steps[step].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{steps[step].description}</p>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {step + 1} of {steps.length}
            </div>
          </div>
          
          <div className="relative">
            <div className="flex justify-between mb-2">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      i < step 
                        ? 'bg-green-500 text-white' 
                        : i === step 
                        ? 'bg-blue-500 text-white shadow-lg scale-110' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    }`}>
                      {i < step ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                    </div>
                    <span className="text-xs mt-1 text-center max-w-16 text-gray-600 dark:text-gray-400 hidden sm:block">
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
                style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            {/* Step 0: Basic Info */}
            {step === 0 && (
              <div className="space-y-6 animate-in slide-in-from-right-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField name="employeeCode" placeholder="Employee Code" required icon={User} value={formData.employeeCode} onChange={handleChange} errors={errors} />
                  <InputField name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} errors={errors} />
                  <InputField name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} errors={errors} />
                  <InputField name="personalEmail" placeholder="Personal Email" type="email" required value={formData.personalEmail} onChange={handleChange} errors={errors} />
                  <InputField name="workEmail" placeholder="Work Email" type="email" required value={formData.workEmail} onChange={handleChange} errors={errors} />
                  <InputField name="password" placeholder="Password" type="password" required value={formData.password} onChange={handleChange} errors={errors} />
                  <InputField name="contactNumber" placeholder="Contact Number" required value={formData.contactNumber} onChange={handleChange} errors={errors} />
                  <InputField name="address" placeholder="Address" required value={formData.address} onChange={handleChange} errors={errors} />
                  <InputField name="city" placeholder="City" required value={formData.city} onChange={handleChange} errors={errors} />
                  <InputField name="country" placeholder="Country" required value={formData.country} onChange={handleChange} errors={errors} />
                </div>
              </div>
            )}

            {/* Step 1: Job Details */}
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField name="dateOfJoining" type="date" placeholder="Date of Joining" required icon={Calendar} value={formData.dateOfJoining} onChange={handleChange} errors={errors} />
                  <InputField name="department" placeholder="Department" required icon={Building} value={formData.department} onChange={handleChange} errors={errors} />
                  <InputField name="designation" placeholder="Designation" required icon={Briefcase} value={formData.designation} onChange={handleChange} errors={errors} />
                  <div className="md:col-span-2 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Briefcase size={18} />
                    </div>
                    <select 
                      name="employmentType" 
                      value={formData.employmentType || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
                    >
                      <option value="">Select Employment Type *</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Intern">Intern</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Identity */}
            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField name="aadharCardNumber" placeholder="Aadhar Card Number" required icon={Shield} value={formData.aadharCardNumber} onChange={handleChange} errors={errors} />
                  <InputField name="panCardNumber" placeholder="PAN Card Number" required icon={Shield} value={formData.panCardNumber} onChange={handleChange} errors={errors} />
                </div>
              </div>
            )}

            {/* Step 3: Education */}
            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-5">
                <div className="text-center py-8">
                  <GraduationCap className="mx-auto text-blue-500 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Education Details</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">This step is optional. You can skip or add details later.</p>
                  <InputField name="qualification" placeholder="Highest Qualification (optional)" icon={GraduationCap} value={formData.qualification} onChange={handleChange} errors={errors} />
                </div>
              </div>
            )}

            {/* Step 4: Employment History */}
            {step === 4 && (
              <div className="space-y-6 animate-in slide-in-from-right-5">
                <div className="text-center mb-6">
                  <Building className="mx-auto text-blue-500 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Employment History</h3>
                  <p className="text-gray-600 dark:text-gray-400">Previous work experience details</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    name="totalExperience" 
                    placeholder="Total Experience (e.g., 3 years 6 months)" 
                    icon={Building}
                    value={formData.totalExperience} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="organizationName" 
                    placeholder="Previous Organization Name" 
                    icon={Building}
                    value={formData.organizationName} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="previousDesignation" 
                    placeholder="Previous Designation" 
                    icon={Briefcase}
                    value={formData.previousDesignation} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="workLocation" 
                    placeholder="Work Location" 
                    icon={Building}
                    value={formData.workLocation} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="employmentFromDate" 
                    type="date" 
                    placeholder="Employment Start Date" 
                    icon={Calendar}
                    value={formData.employmentFromDate} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="employmentToDate" 
                    type="date" 
                    placeholder="Employment End Date" 
                    icon={Calendar}
                    value={formData.employmentToDate} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills (comma-separated)
                  </label>
                  <textarea
                    name="skills"
                    placeholder="e.g., JavaScript, React, Node.js, MongoDB"
                    value={formData.skills || ''}
                    onChange={() => handleChange}
                    rows={3}
                    className="w-full pl-4 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Salary Account */}
            {step === 5 && (
              <div className="space-y-6 animate-in slide-in-from-right-5">
                <div className="text-center mb-6">
                  <CreditCard className="mx-auto text-blue-500 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Salary Account Details</h3>
                  <p className="text-gray-600 dark:text-gray-400">Banking and payroll information</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    name="bankName" 
                    placeholder="Bank Name *" 
                    required
                    icon={CreditCard}
                    value={formData.bankName} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="accountNumber" 
                    placeholder="Account Number *" 
                    required
                    icon={CreditCard}
                    value={formData.accountNumber} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="ifscCode" 
                    placeholder="IFSC Code *" 
                    required
                    icon={CreditCard}
                    value={formData.ifscCode} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="branchName" 
                    placeholder="Branch Name *" 
                    required
                    icon={CreditCard}
                    value={formData.branchName} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="uan" 
                    placeholder="UAN Number" 
                    icon={CreditCard}
                    value={formData.uan} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="pfAccountNumber" 
                    placeholder="PF Account Number" 
                    icon={CreditCard}
                    value={formData.pfAccountNumber} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="esicNumber" 
                    placeholder="ESIC Number" 
                    icon={CreditCard}
                    value={formData.esicNumber} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Salary Structure (Optional)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      name="basicSalary" 
                      placeholder="Basic Salary" 
                      type="number"
                      value={formData.basicSalary} 
                      onChange={handleChange} 
                      errors={errors} 
                    />
                    <InputField 
                      name="hra" 
                      placeholder="HRA" 
                      type="number"
                      value={formData.hra} 
                      onChange={handleChange} 
                      errors={errors} 
                    />
                    <InputField 
                      name="allowances" 
                      placeholder="Other Allowances" 
                      type="number"
                      value={formData.allowances} 
                      onChange={handleChange} 
                      errors={errors} 
                    />
                    <InputField 
                      name="deductions" 
                      placeholder="Deductions" 
                      type="number"
                      value={formData.deductions} 
                      onChange={handleChange} 
                      errors={errors} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Dependents */}
            {step === 6 && (
              <div className="space-y-6 animate-in slide-in-from-right-5">
                <div className="text-center mb-6">
                  <Users className="mx-auto text-blue-500 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dependents & Emergency Contact</h3>
                  <p className="text-gray-600 dark:text-gray-400">Family and emergency contact information</p>
                </div>
                
                <div className="space-y-8">
                  {/* Spouse Details */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Spouse Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField 
                        name="spouseName" 
                        placeholder="Spouse Name" 
                        icon={User}
                        value={formData.spouseName} 
                        onChange={handleChange} 
                        errors={errors} 
                      />
                      <InputField 
                        name="spouseDob" 
                        type="date" 
                        placeholder="Spouse Date of Birth" 
                        icon={Calendar}
                        value={formData.spouseDob} 
                        onChange={handleChange} 
                        errors={errors} 
                      />
                    </div>
                  </div>

                  {/* Children Details */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Children Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField 
                        name="childName" 
                        placeholder="Child Name" 
                        icon={Users}
                        value={formData.childName} 
                        onChange={handleChange} 
                        errors={errors} 
                      />
                      <InputField 
                        name="childDob" 
                        type="date" 
                        placeholder="Child Date of Birth" 
                        icon={Calendar}
                        value={formData.childDob} 
                        onChange={handleChange} 
                        errors={errors} 
                      />
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <Users size={18} />
                        </div>
                        <select 
                          name="childGender" 
                          value={formData.childGender || ''}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <InputField 
                        name="childRelationship" 
                        placeholder="Relationship (Son/Daughter)" 
                        value={formData.childRelationship} 
                        onChange={handleChange} 
                        errors={errors} 
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Emergency Contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField 
                        name="emergencyContactName" 
                        placeholder="Emergency Contact Name" 
                        icon={User}
                        value={formData.emergencyContactName} 
                        onChange={handleChange} 
                        errors={errors} 
                      />
                      <InputField 
                        name="emergencyContactRelation" 
                        placeholder="Relationship" 
                        icon={Users}
                        value={formData.emergencyContactRelation} 
                        onChange={handleChange} 
                        errors={errors} 
                      />
                      <InputField 
                        name="emergencyContactPhone" 
                        placeholder="Emergency Contact Phone" 
                        icon={User}
                        value={formData.emergencyContactPhone} 
                        onChange={handleChange} 
                        errors={errors} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder steps */}
            {step > 3 && step < 7 && (
              <div className="text-center py-12 animate-in slide-in-from-right-5">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
                  {React.createElement(steps[step].icon, { size: 32, className: "text-blue-500" })}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{steps[step].title}</h3>
                <p className="text-gray-600 dark:text-gray-400">This section will be available in the next update.</p>
              </div>
            )}

            {/* Step 7: Leave Balance */}
            {step === 7 && (
              <div className="space-y-6 animate-in slide-in-from-right-5">
                <div className="text-center mb-6">
                  <Calendar className="mx-auto text-blue-500 mb-4" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Leave Balance Setup</h3>
                  <p className="text-gray-600 dark:text-gray-400">Configure initial leave balance for the employee</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    name="casual" 
                    placeholder="Casual Leave" 
                    type="number"
                    value={formData.casual || '0'} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="sick" 
                    placeholder="Sick Leave" 
                    type="number"
                    value={formData.sick || '0'} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="earned" 
                    placeholder="Earned Leave" 
                    type="number"
                    value={formData.earned || '0'} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="compOffs" 
                    placeholder="Comp-Off" 
                    type="number"
                    value={formData.compOffs || '0'} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="bereavement" 
                    placeholder="Bereavement Leave" 
                    type="number"
                    value={formData.bereavement || '0'} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="examLeave" 
                    placeholder="Exam Leave" 
                    type="number"
                    value={formData.examLeave || '0'} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="marriageLeave" 
                    placeholder="Marriage Leave" 
                    type="number"
                    value={formData.marriageLeave || '0'} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                  <InputField 
                    name="unpaidLeave" 
                    placeholder="Unpaid Leave" 
                    type="number"
                    value={formData.unpaidLeave || '0'} 
                    onChange={handleChange} 
                    errors={errors} 
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mt-6">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Leave Policy Information</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    These are the initial leave balances for the employee. Leave balances will be automatically updated based on company policy and can be modified later by HR administrators.
                  </p>
                </div>
              </div>
            )}

            {/* Final Review Step */}
            {step === 8 && (
              <div className="text-center py-12 animate-in slide-in-from-right-5">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Almost Done!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Review your information and create the employee account.</p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-left max-w-md mx-auto">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>Employee Code: {formData.employeeCode || 'Not provided'}</p>
                    <p>Name: {formData.firstName || ''} {formData.lastName || ''}</p>
                    <p>Email: {formData.workEmail || 'Not provided'}</p>
                    <p>Department: {formData.department || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 dark:bg-gray-700/50 px-8 py-6 border-t border-gray-100 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  step === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-600'
                }`}
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <div className="flex gap-3">
                {step === 3 && (
                  <button
                    onClick={nextStep}
                    className="px-6 py-2.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-xl transition-all duration-200"
                  >
                    Skip
                  </button>
                )}

                {step < steps.length ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Next
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={submitHandler}
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Create Employee
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;