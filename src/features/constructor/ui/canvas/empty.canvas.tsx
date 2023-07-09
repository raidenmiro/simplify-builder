import { Icon } from "~/shared/ui/icon";

export const EmptyCanvas = () => {
  return (
    <div className="select-none text-center text-xs font-normal leading-4">
      <Icon className="mb-3 inline-flex h-5 w-5" variant="EmptyState" />
      <span className="block text-sm font-medium text-blue-900">
        Перетащите сюда
      </span>
      <p className="mx-auto w-[100px]">любой элемент из левой панели</p>
    </div>
  );
};
EmptyCanvas.displayName = "Constructor.EmptyCanvas";
