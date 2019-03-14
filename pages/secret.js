import React, { useEffect, useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { getSecretData } from "../actions/index";
import withAuth from "../components/hoc/withAuth";

const asyncSecretData = async setSecretData => {
  try {
    const secretData = await getSecretData();
    setSecretData(secretData);
  } catch (error) {
    console.log(error);
  }
};

const Secret = props => {
  const [secretData, setSecretData] = useState([]);

  const { superSecretValue } = props;

  useEffect(() => {
    asyncSecretData(setSecretData);
  }, []);

  const displaySecretData = () => {
    if (secretData && secretData.length > 0) {
      return secretData.map((data, index) => (
        <React.Fragment key={index}>
          <p>{data.title}</p>
          <p>{data.description}</p>
        </React.Fragment>
      ));
    } else {
      return null;
    }
  };

  return (
    <BaseLayout {...props.auth} router={props.router}>
      <BasePage>
        <h1>I am Secret page</h1>
        <p>Secret Content Here</p>
        <h2>{superSecretValue}</h2>
        {displaySecretData()}
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth()(Secret);

Secret.getInitialProps = async ({ req }) => {
  const anotherSecretData = await getSecretData(req);

  return { anotherSecretData };
};
