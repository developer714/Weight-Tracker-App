import React, { useContext, useEffect, useState } from "react";
import WeightInputScreen from "../../component/WeightInputScreen/WeightInputScreen";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import {
  checkHealthConnection,
  getUserWeights,
  mutationUserWeights,
} from "../../firebaseApis/healthApis";
import { GlobalContext } from "../../contexts/GlobalContext";
import Loading from "../Loading/Loading";
import { Paths } from "../../AppConstants";

function CurrentWeightScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { userWeights, setUserWeights } = useContext(GlobalContext);
  const { uid } = useContext(UserContext);
  const [weight, setWeight] = useState(80);

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
      setWeight(userWeights.current_weight);
    }
  }, [userWeights]);

  const handleNextOrSkip = async () => {
    setLoading(true);
    await mutationUserWeights({ uid, key: "current_weight", value: weight })
      .then((res) => {
        if (res.data.result) navigate(Paths.DREAM_WEIGHT);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };

  const handleBack = () => navigate(-1);

  if (loading) return <Loading />;

  return (
    <WeightInputScreen
      title="What's your current progress?"
      subtitle="Please tell me what is your weight for today"
      placeholder="Current Weight"
      buttonText="Done!"
      initialValue={!userWeights ? weight : userWeights.current_weight}
      onChange={(e) => setWeight(e)}
      onNext={handleNextOrSkip}
      onSkip={handleNextOrSkip}
      onBack={handleBack}
    />
  );
}

export default CurrentWeightScreen;
