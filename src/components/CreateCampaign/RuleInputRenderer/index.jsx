import { CustomerRuleInput } from "../CustomerRuleInput";
import { MultiValueRuleInput } from "../MultiValueRuleInput";

export const RuleInputRenderer = ({
  onDelete,
  onOperatorChange,
  onValueChange,
  productCollectionOptions,
  productOptions,
  productTagOptions,
  productTypeOptions,
  rule,
  tagOptions,
  variantOptions,
}) => {
  switch (rule.field) {
    case "customer-tags":
      return (
        <MultiValueRuleInput
          label={rule.label}
          onDelete={onDelete}
          onOperatorChange={onOperatorChange}
          onValueChange={onValueChange}
          operatorOptions={rule.operatorOptions}
          operatorValue={rule.operator}
          options={tagOptions}
          placeholder={rule.placeholder}
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
          prefix="$"
          value={rule.value}
        />
      );
    case "product-tags":
      return (
        <MultiValueRuleInput
          label={rule.label}
          onDelete={onDelete}
          onOperatorChange={onOperatorChange}
          onValueChange={onValueChange}
          operatorOptions={rule.operatorOptions}
          operatorValue={rule.operator}
          options={productTagOptions}
          placeholder={rule.placeholder}
          value={rule.value}
        />
      );
    case "specific-products":
      return (
        <MultiValueRuleInput
          label={rule.label}
          onDelete={onDelete}
          onOperatorChange={onOperatorChange}
          onValueChange={onValueChange}
          operatorOptions={rule.operatorOptions}
          operatorValue={rule.operator}
          options={productOptions}
          placeholder={rule.placeholder}
          value={rule.value}
        />
      );
    case "specific-variants":
      return (
        <MultiValueRuleInput
          label={rule.label}
          onDelete={onDelete}
          onOperatorChange={onOperatorChange}
          onValueChange={onValueChange}
          operatorOptions={rule.operatorOptions}
          operatorValue={rule.operator}
          options={variantOptions}
          placeholder={rule.placeholder}
          value={rule.value}
        />
      );
    case "specific-collection":
      return (
        <MultiValueRuleInput
          label={rule.label}
          onDelete={onDelete}
          onOperatorChange={onOperatorChange}
          onValueChange={onValueChange}
          operatorOptions={rule.operatorOptions}
          operatorValue={rule.operator}
          options={productCollectionOptions}
          placeholder={rule.placeholder}
          value={rule.value}
        />
      );
    case "product-types":
      return (
        <MultiValueRuleInput
          label={rule.label}
          onDelete={onDelete}
          onOperatorChange={onOperatorChange}
          onValueChange={onValueChange}
          operatorOptions={rule.operatorOptions}
          operatorValue={rule.operator}
          options={productTypeOptions}
          placeholder={rule.placeholder}
          value={rule.value}
        />
      );
    default:
      return null;
  }
};
