export const energeticTotal = (req, res, next) => {
  // metabolic rate by harris benedict
  let tmbHarris
  // genderfactor used in the muller expression
  let genderFactor
  // activity factor
  const activityFactor = req.body.activityFactor

  // body mass index
  const imc = req.body.weight / ((req.body.height / 100) ** 2)

  // case the person is obese
  if (req.body.obesity) {
    let tmbMifflinStJeor

    // case is female
    if (req.body.gender.toLowerCase() === 'female') {
      tmbMifflinStJeor = (10 * req.body.weight) + (6.25 * req.body.height) -
      (5 * req.body.age) - 161
    }

    // case is male
    if (req.body.gender.toLowerCase() === 'male') {
      tmbMifflinStJeor = (10 * req.body.weight) + (6.25 * req.body.height) -
      (5 * req.body.age) + 5
    }
    return res.json({
      imc: imc,
      tmbMifflinStJeor: tmbMifflinStJeor,
      getMifflinStJeor: tmbMifflinStJeor * activityFactor
    })
  }

  // case the pacient is male for harris
  if (req.body.gender.toLowerCase() === 'male') {
    tmbHarris = 88.32 + (13.397 * req.body.weight) + (4.799 * req.body.height) -
    (5.677 * req.body.age)

    genderFactor = 1
  }

  // case the pacient is female for harris
  if (req.body.gender.toLowerCase() === 'female') {
    tmbHarris = 447.593 + (9.247 * req.body.weight) + (3.098 * req.body.height) -
    (4.330 * req.body.age)

    genderFactor = 0
  }

  // case the pacient dont now his body fat we only return harris
  if (!req.body.bodyFat) {
    const getHarris = tmbHarris * activityFactor
    return res.json({
      imc: imc,
      tmbHarris: tmbHarris,
      getHarris: getHarris
    })
  }

  // case the pacient nows his bodyfat we return muller and harris
  const fatMass = req.body.weight * req.body.bodyFat / 100

  const tmbMuller = (13.587 * (req.body.weight - fatMass)) + (9.631 * fatMass) +
  (198 * genderFactor) - (3.351 * req.body.age) + 674

  const getHarris = tmbHarris * activityFactor
  const getMuller = tmbMuller * activityFactor

  res.json({
    imc: imc,
    tmbHarris: tmbHarris,
    getHarris: getHarris,
    tmbMuller: tmbMuller,
    getMuller: getMuller
  })
}

export default {
  energeticTotal
}
