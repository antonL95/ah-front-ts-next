type props = {
  classNames?: string;
};
const Underline = (props: props) => {
  return (
    <svg
      className={`w-[155px] md:w-[188px] ${props.classNames} `}
      viewBox="0 0 188 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 7.5C0.5 7.5 36 1.5 94 1.5C152 1.5 187.5 7.5 187.5 7.5"
        stroke="#CCCCCC"
        strokeWidth="2"
      />
    </svg>
  );
};
export default Underline;
