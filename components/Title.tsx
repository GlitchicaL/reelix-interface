interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return (
    <h1 className="text-2xl font-carter text-white">
      {text}
    </h1>
  );
}

export default Title;