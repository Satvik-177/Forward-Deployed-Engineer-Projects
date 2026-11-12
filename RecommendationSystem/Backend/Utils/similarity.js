const cosineSimilarity = (VectorA, VectorB)=>{

    let dotProduct = 0;
    let magA = 0;
    let magB = 0;

    for(let i=0; i<VectorA.length; i++){

        dotProduct += VectorA[i]*VectorB[i];
        magA += VectorA[i]*VectorA[i];
        magB += VectorB[i]*VectorB[i];

    }

    if(magA === 0  ||  magB === 0){
        return 0;
    }

    return dotProduct/(Math.sqrt(magA)*Math.sqrt(magB))
}

export default cosineSimilarity