import React, { useContext, useEffect, useState } from "react";
import WeightInputScreen from "../../component/WeightInputScreen/WeightInputScreen";
import { useNavigate } from "react-router-dom";
import {
  checkHealthConnection,
  getUserWeights,
  mutationUserWeights,
} from "../../firebaseApis/healthApis";
import { UserContext } from "../../contexts/UserContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import Loading from "../Loading/Loading";
import { Paths } from "../../AppConstants";

function DreamWeightScreen() {
  const { uid } = useContext(UserContext);
  const { userWeights, setUserWeights } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [weight, setWeight] = useState(80);
  const navigate = useNavigate();

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

  const handleNextOrSkip = async () => {
    setLoading(true);
    await mutationUserWeights({ uid, key: "dream_weight", value: weight })
      .then((res) => {
        if (res.data.result) navigate(Paths.MEDICINE_NAME);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };
  const handleBack = () => navigate(-1);

  if (loading) return <Loading />;

  return (
    <WeightInputScreen
      title="And what weight you'd like to achieve?"
      subtitle="Please tell me what is your dream weight"
      placeholder="Dream Weight"
      buttonText="Done!"
      initialValue={!userWeights ? weight : userWeights.dream_weight}
      onChange={(e) => setWeight(e)}
      onNext={handleNextOrSkip}
      onSkip={handleNextOrSkip}
      onBack={handleBack}
    />
  );
}

export default DreamWeightScreen;
