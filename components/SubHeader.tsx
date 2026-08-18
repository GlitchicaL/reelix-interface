import Title from "@/components/Title";
import Back from "@/components/Back";
import Refresh from "@/components/Refresh";

interface SubHeaderProps {
  title: string;
  onBack?: () => void;
}

function SubHeader({ title = "", onBack }: SubHeaderProps) {
  return (
    <div className="flex place-items-center justify-between pt-4">
      <div className="flex place-items-center gap-2">
        {onBack && window && window.history.length > 1 && (
          <Back action={onBack} />
        )}

        <Title text={title} />
      </div>

      <Refresh />
    </div>
  );
}

export default SubHeader;