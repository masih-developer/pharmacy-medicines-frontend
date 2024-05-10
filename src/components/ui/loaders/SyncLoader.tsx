import { SyncLoader as Loader } from "react-spinners";
import { LoaderSizeMarginProps } from "react-spinners/helpers/props";

const SyncLoader: React.FC<LoaderSizeMarginProps> = ({
  color = "hsl(var(--primary))",
  size = 8,
  ...props
}) => {
  return <Loader color={color} size={size} {...props} />;
};

export default SyncLoader;
