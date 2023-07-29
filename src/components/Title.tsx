interface TitleProp {
  extra?: string;
  colour: string;
  textSize: string;
  children: React.ReactNode;
}

//prettier-ignore
export default function Title({ extra, colour, textSize, children }: TitleProp) {
  return (
    <h2
      className={`${textSize} ${colour} ${extra} font-medium uppercase tracking-tight`}
    >
      {children}
      <span className="inline-block ml-2 h-2 w-2 rounded-sm bg-brand-base" />
    </h2>
  );
}
