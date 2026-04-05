import { CustomerRuleInput } from "../CustomerRuleInput";
import { CustomerTagRuleInput } from "../CustomerTagRuleInput";

export const RuleInputRenderer = ({ onDelete, onOperatorChange, onValueChange, rule, tagOptions }) => {
  switch (rule.field) {
    case "customer-tags":
      return (
        <CustomerTagRuleInput
          label={rule.label}
          onDelete={onDelete}
          onOperatorChange={onOperatorChange}
          onValueChange={onValueChange}
          operatorOptions={rule.operatorOptions}
          operatorValue={rule.operator}
          placeholder={rule.placeholder}
          tagOptions={tagOptions}
          value={rule.value}
        />
      );
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
