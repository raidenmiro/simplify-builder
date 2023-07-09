import type { HTMLAttributes } from "preact/compat";

type SourceSprites = "EmptyState" | "Switch" | "Eye";

const ROOT = "icons";

interface IconProps extends HTMLAttributes<SVGSVGElement> {
  variant: SourceSprites;
}

const Icon = ({ className, variant, ...attributes }: IconProps) => {
  return (
    <svg className={className} {...attributes}>
      <use xlinkHref={`/sprite/${ROOT}.svg#${variant}`} />
    </svg>
  );
};
Icon.displayName = "Icon.Sprites";

export { type IconProps, type SourceSprites, Icon };
