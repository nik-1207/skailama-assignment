import { ChevronRight } from "lucide-react";
import { Modal } from "../../Modal";
import { CAMPAIGN_RULE_GROUPS, CAMPAIGN_RULE_GROUP_ICONS } from "../utils";
import styles from "./ruleSelectionModal.module.scss";

export const RuleSelectionModal = ({ onClose, onSelectRule, open }) => {
  return (
    <Modal onClose={onClose} open={open} title="Select eligibility rule">
      <div className={styles.content}>
        {CAMPAIGN_RULE_GROUPS.map((group) => {
          const Icon = CAMPAIGN_RULE_GROUP_ICONS[group.key];

          return (
            <section className={styles.group} key={group.key}>
              <div className={styles.groupHeader}>
                {Icon ? <Icon className={styles.groupIcon} size={16} /> : null}
                <h2 className={styles.groupTitle}>{group.title}</h2>
              </div>

              <div className={styles.ruleList}>
                {group.rules.map((rule) => (
                  <button className={styles.ruleButton} key={rule.key} onClick={() => onSelectRule(rule.key)} type="button">
                    <div className={styles.ruleText}>
                      <span className={styles.ruleLabel}>{rule.label}</span>
                      <span className={styles.ruleDescription}>{rule.description}</span>
                    </div>
                    <ChevronRight className={styles.ruleChevron} size={18} />
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Modal>
  );
};
