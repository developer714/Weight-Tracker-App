import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeightInputScreen from "../../component/WeightInputScreen/WeightInputScreen";
import {
  checkHealthConnection,
  getUserWeights,
  mutationUserWeights,
} from "../../firebaseApis/healthApis";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../Loading/Loading";
import { Paths } from "../../AppConstants";

function StartWeightScreen() {
  const navigate = useNavigate();
  const { uid } = useContext(UserContext);
  const { userWeights, setUserWeights } = useContext(GlobalContext);
  const [weight, setWeight] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkHealthConnection({ uid })
      .then((res) => {
        if (res.data.result) {
          getUserWeights({ uid })
            .then((res) => {
              setUserWeights(res.data.data);
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (userWeights) {
      setWeight(userWeights.start_weight);
    }
  }, [userWeights]);

  const handleNextOrSkip = async () => {
    setLoading(true);
    await mutationUserWeights({ uid, key: "start_weight", value: weight })
      .then((res) => {
        if (res.data.result) navigate(Paths.CURRENT_WEIGHT);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };
  const handleBack = () => navigate(-1);

  if (loading) {
    return <Loading />;
  }

  return (
    <WeightInputScreen
      title="I need to know your weight to help you track the progress!"
      subtitle="Please enter your start weight"
      placeholder="Start Weight"
      buttonText="Done!"
      initialValue={!userWeights ? weight : userWeights.start_weight}
      onChange={(e) => setWeight(e)}
      onNext={handleNextOrSkip}
      onSkip={handleNextOrSkip}
      onBack={handleBack}
    />
  );
}

export default StartWeightScreen;
