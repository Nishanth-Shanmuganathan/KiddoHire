export class Job {
  constructor(
    private designation: string,
    private description: string,
    private skills: string[],
    private minimumExperience: number,
    private maximumExperience: number,
    private minimumSalary: number,
    private maximumSalary: number,
    private location: string,
    private totalRounds: number,
    private rounds: {
      date: Date,
      description: string
    }[]
  ) { }
}
