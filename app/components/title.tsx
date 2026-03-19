import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "time" | "p";
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

const classNames = {
  primary: "font-semibold text-4xl tracking-tight text-slate-900 dark:text-slate-100",
  secondary: "font-semibold text-2xl tracking-tight text-slate-900 dark:text-slate-100",
  tertiary: "font-semibold text-xl tracking-tight text-slate-900 dark:text-slate-100",
};

export function Title({ children, as = "span", variant = "primary", className }: Props) {
  const Component = as;
  return <Component className={clsx(classNames[variant], className)}>{children}</Component>;
}
