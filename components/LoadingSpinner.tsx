export type LoadingSpinnerProps = {
  size?: number;
  className?: string;
  label?: string;
};

export function LoadingSpinner({
  size = 32,
  className = "",
  label = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={[loadingSpinnerWrapperClass, className].filter(Boolean).join(" ")}
    >
      <span className={loadingSpinnerIndicatorClass} style={{ width: size, height: size }} />
      <span className={loadingSpinnerSrOnlyClass}>{label}</span>
    </div>
  );
}

// Presentation style constants
const loadingSpinnerWrapperClass = "inline-flex items-center justify-center";
const loadingSpinnerIndicatorClass =
  "block animate-spin rounded-full border-2 border-gray-300 border-t-indigo-500 dark:border-gray-700 dark:border-t-indigo-400";
const loadingSpinnerSrOnlyClass = "sr-only";
