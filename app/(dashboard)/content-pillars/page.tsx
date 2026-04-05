export default function ContentPillarsPage() {
  const pillars = [
    {
      label: "Leadership Development",
      description: "How discipline, standards, and accountability create leaders who perform under pressure.",
    },
    {
      label: "Gen-Z Workforce",
      description: "The unique strengths, expectations, and career signals that define the next generation of professionals.",
    },
    {
      label: "Higher Education",
      description: "What business schools must change to stay relevant to students and employers alike.",
    },
  ];

  return (
    <div className="flex min-h-full flex-col gap-3 px-4 pb-4 pt-3">
      <div className="mb-1">
        <h1 className="font-sans text-[18px] font-bold tracking-[-0.01em] text-white">
          Content Pillars
        </h1>
        <p className="mt-0.5 font-mono text-[11px] text-[#5a6e66]">
          The three lenses your twin uses to filter and frame every piece of content.
        </p>
      </div>
      <div className="flex flex-col gap-3 max-w-2xl">
        {pillars.map((pillar) => (
          <div
            key={pillar.label}
            className="border border-[rgba(0,196,140,0.12)] bg-[#0c1014] px-5 py-4"
          >
            <p className="font-sans text-[13px] font-bold text-white">{pillar.label}</p>
            <p className="mt-1 font-mono text-[11px] leading-relaxed text-[#8a9e96]">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
