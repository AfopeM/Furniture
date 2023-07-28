interface TitleProp {
  size?: string;
  extra?: string;
  colour?: string;
  textSize: string;
  children: React.ReactNode;
}

//prettier-ignore
export default function Title({ size, textSize, colour,  extra, children }: TitleProp) {
  return (
    <h2
      className={`font-medium uppercase tracking-tight text-brand-light 
      ${textSize} ${colour} ${extra}`}
    >
      {children}
      <span className={`inline-block ml-2 h-2 w-2 rounded-sm 
      bg-brand-base ${size}`} />
    </h2>
  );
}
