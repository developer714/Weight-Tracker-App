import React, { useContext, useEffect, useState } from "react";
import WeightInputScreen from "../../component/WeightInputScreen/WeightInputScreen";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../AppConstants";
import Loading from "../Loading/Loading";
import {
  checkHealthConnection,
  getUserWeights,
  mutationUserWeights,
} from "../../firebaseApis/healthApis";
import { UserContext } from "../../contexts/UserContext";
import { GlobalContext } from "../../contexts/GlobalContext";

function TodayWeightScreen() {
  const navigate = useNavigate();
  const { uid } = useContext(UserContext);
  const { userWeights, setUserWeights, loading, setLoading } =
    useContext(GlobalContext);
  const [weight, setWeight] = useState(80);

  useEffect(() => {
    setLoading(true);
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
    await mutationUserWeights({ uid, key: "today_weight", value: weight })
      .then((res) => {
        if (res.data.result) navigate(Paths.DREAM_WEIGHT);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <Loading />;

  return (
    <WeightInputScreen
      title="I need to know your weight to help you track the progress!"
      subtitle="Please enter your start weight"
      placeholder="Today Weight"
      buttonText="Done!"
      initialValue={!userWeights ? weight : userWeights.current_weight}
      onChange={(e) => setWeight(e)}
      onNext={handleNextOrSkip}
      onSkip={handleNextOrSkip}
      onBack={handleBack}
    />
  );
}

export default TodayWeightScreen;
