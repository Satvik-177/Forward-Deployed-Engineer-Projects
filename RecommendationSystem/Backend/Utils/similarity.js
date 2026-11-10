const cosineSimilarity = (VectorA, VectorB)=>{

    const dotProduct = 0;
    const magA = 0;
    const magB = 0;

    for(let i=0; i<VectorA.length(); i++){

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