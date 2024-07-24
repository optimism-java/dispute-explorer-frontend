import type { NextPageContext } from "next";
import Error from "next/error";

const CustomErrorComponent = (props: Error["props"]) => {
  return <Error {...props} />;
};

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  // This will contain the status code of the response
  return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;
