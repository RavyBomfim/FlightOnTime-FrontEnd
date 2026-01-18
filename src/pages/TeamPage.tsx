import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Daniel Borges Crema",
    picture: "daniel.jpg",
    github: "https://github.com/DanielCrema",
    linkedin: "https://linkedin.com/in/daniel-crema-dev",
    role: "Data Scientist",
  },
  {
    name: "Fabio Samuel dos Santos Canedo",
    picture: "fabio.jpg",
    github: "https://github.com/Acheroniano",
    linkedin: "https://linkedin.com/in/fabiosscanedo",
    role: "Data Engineer",
  },
  {
    name: "Marcelo Comanduci Fernandes Neto",
    picture: "marcelo.jpg",
    github: "https://github.com/mcomanduci",
    linkedin: "https://linkedin.com/in/mcomanduci",
    role: "Backend Developer",
  },
  {
    name: "Marcia Escolástico da Silva",
    picture: "marcia.jpg",
    github: "https://github.com/MEscola",
    linkedin: "https://linkedin.com/in/marcia-escolastico-44882436/",
    role: "Backend Developer",
  },
  {
    name: "Murilo Lopes Frade",
    picture: "https://avatars.githubusercontent.com/u/53382313?v=4",
    github: "https://github.com/MuriloLopesFrade",
    linkedin: "https://linkedin.com/in/murilo-lopes-frade/",
    role: "Data Scientist",
  },
  {
    name: "Ravy Bomfim",
    picture: "ravy.jpeg",
    github: "https://github.com/RavyBomfim",
    linkedin: "https://linkedin.com/in/ravybomfim",
    role: "Data Engineer",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-0 pb-12 px-4">
      <div className="relative w-full flex flex-col items-center mb-0 py-10">
        {/* Logo de Fundo (Atrás do Título) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <img
            src="alcateia-logo.png"
            alt=""
            className="w-64 md:w-125 opacity-[0.05] grayscale blur-[2px] transition-all duration-700 group-hover:opacity-10"
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-sky-100 tracking-tighter drop-shadow-2xl mb-2">
            Nossa Equipe
          </h1>
          <span className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-primary/60 block">
            Conheça a nossa equipe dedicada
          </span>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-primary" />
            <div className="size-2 rounded-full border-2 border-primary bg-background" />
            <div className="h-px w-12 bg-linear-to-l from-transparent to-primary" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {teamMembers.map((member, idx) => (
          <Card
            key={idx}
            className="group relative overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 py-0 border-none"
          >
            {/* Linha decorativa no topo usando a cor primária do seu tema */}
            <div className="h-1.5 w-full bg-primary/20 group-hover:bg-primary transition-colors" />

            <CardHeader className="flex flex-col items-center pt-8 px-6">
              <div className="relative">
                <img
                  src={
                    member.picture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      member.name
                    )}&background=random`
                  }
                  alt={member.name}
                  className="size-30 rounded-full object-cover border-4 border-background shadow-md"
                />
              </div>

              <div className="mt-4 text-center">
                <CardTitle className="text-xl font-bold text-sky-100 leading-tight tracking-tight ">
                  {member.name}
                </CardTitle>
                {/* Texto secundário usando a cor primária com opacidade */}
                <p className="text-sm font-medium text-primary mt-1.5 opacity-90 uppercase tracking-wider">
                  {member.role || "Membro"}
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex justify-center pb-8">
              <div className="flex gap-3">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
