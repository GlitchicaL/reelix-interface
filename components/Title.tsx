interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return (
    <h1 className="text-3xl font-kumbh font-bold text-white">
      {text}
    </h1>
  );
}

export default Title;