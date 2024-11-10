import styles from "./ExitPreviewButton.module.css";
import Link from "@components/Atoms/Link";
import { draftMode } from "next/headers";

export default function ExitPreviewButton() {
  const { isEnabled } = draftMode();

  return (
    <div>
      {isEnabled && (
        <Link href={"/api/disable-draft"} className={styles.button}>
          Exit Preview Mode
        </Link>
      )}
    </div>
  );
}
