export default class QuizResults {
    results = new Map();
    constructor(questions, answers){
        for (let i = 0; i < questions.length; i++) {
            this.results.set(questions[i], answers[i]);
        }
    }

    getData(){
        let str = "";
        this.results.forEach((v, k) => {
            str += k + ": " + v + ",\n";
        });
        return str;
    }
}