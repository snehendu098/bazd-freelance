import JobCard from "@/components/core/app/job-card";

export default function JobBoard() {
  const jobs = [
    {
      owner: "0x419E5aD68d2Ff4d1786FE4bB7ebe7b3563A5A6d7",
      date: "2/12/24",
      tags: ["Finance", "Data Analysis", "MBA"],
      minimumPayment: 0.1,
      title: "Senior Software Engineer",
      _id: "ausdgs",
    },
    {
      owner: "0x419E5aD68d2Ff4d1786FE4bB7ebe7b3563A5A6d7",
      date: "2/12/24",
      tags: ["Finance", "Data Analysis", "MBA"],
      minimumPayment: 0.1,
      title: "Senior Software Engineer",
      _id: "ausdgs",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-blue-900">
          Featured Opportunities
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((item, idx) => (
          <JobCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}
