export class Job {
  constructor(
    public designation: string,
    public description: string,
    public skills: string[],
    public minimumExperience: number,
    public maximumExperience: number,
    public minimumSalary: number,
    public maximumSalary: number,
    public location: string,
    public totalRounds: number,
    public rounds: {
      date: Date,
      description: string
    }[],
    public _id?: string,
    public applicants?: { applicants: { applicant: string, jobMatch: number }[], round: number }[],
    public shortlisted?: { applicant: string, accepted: boolean }[],
    public postedBy?: {
      imageURL: string,
      username: string,
      employees: string,
      profileName: string,
      // employees: string,
      // employees: string,
      // employees: string,
    }
  ) { }
}
