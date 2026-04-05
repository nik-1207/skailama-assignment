import { CustomerRuleInput } from "../CustomerRuleInput";

export const RuleInputRenderer = ({ onDelete, onOperatorChange, onValueChange, rule }) => {
  switch (rule.field) {
    case "customer-tags":
    case "customer-spent":
      return (
        <CustomerRuleInput
          inputType={rule.inputType}
          label={rule.label}
          onDelete={onDelete}
          onOperatorChange={onOperatorChange}
          onValueChange={onValueChange}
          operatorOptions={rule.operatorOptions}
          operatorValue={rule.operator}
          placeholder={rule.placeholder}
          value={rule.value}
        />
      );
    default:
      return null;
  }
};
