import Image from "next/image";
import { useState } from "react";
import styles from "./UtilList.module.css";

export default function UtilList() {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleCopyUrl = async () => {
    const urlToCopy = window.location.href;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setIsToastVisible(true);
    } catch (err) {
      console.error("복사할 수 없습니다 : ", err);
    }
  };
  return (
    <>
      <div className={styles.UtilList}>
        <button className={styles.copy} onClick={handleCopyUrl}>
          <Image fill src="/images/ic_copy.svg" alt="공유" />
        </button>
      </div>
      {isToastVisible && (
        <span
          onAnimationEnd={() => setIsToastVisible(false)}
          className={`${styles.toast} caption-medium`}
        >
          루틴이 복사되었습니다.
        </span>
      )}
    </>
  );
}
