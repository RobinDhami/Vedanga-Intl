// app/academics/programs/[slug]/page.tsx
import { PROGRAM_DATA, PROGRAM_LIST } from "../programData";
import ProgramContent from "./ProgramDetail";

export async function generateStaticParams() {
    return PROGRAM_LIST.map((program) => ({
        slug: program.slug,
    }));
}
export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
    if (!params?.slug) {
        return <div className="min-h-screen flex items-center justify-center">Invalid program</div>;
    }

    const program = PROGRAM_DATA[params.slug as keyof typeof PROGRAM_DATA];

    if (!program) {
        return <div className="min-h-screen flex items-center justify-center">Program not found</div>;
    }

    return <ProgramContent program={program} />;
}