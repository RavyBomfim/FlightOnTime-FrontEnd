import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Linkedin, Users } from "lucide-react";

const About = () => {
  const equipe = {
    dataScience: [
      { nome: "Ravieli dos Santos Bomfim (Líder)", link: "https://www.linkedin.com/in/ravieli-bomfim/" },
      { nome: "Daniel Borges Crema", link: "https://www.linkedin.com/in/daniel-crema-dev/" },
      { nome: "Fabio Samuel dos Santos Canedo", link: "https://www.linkedin.com/in/fabiosscanedo/" },
      { nome: "Murilo Lopes Frade", link: "https://www.linkedin.com/in/murilo-lopes-frade/" },
    ],
    backend: [
      { nome: "Marcia Escolástico da Silva", link: "https://www.linkedin.com/in/marcia-escolastico-44882436/" },
      { nome: "Marcelo Comanduci Fernandes Neto", link: "https://www.linkedin.com/in/mcomanduci/" },

    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Sobre Nós</h1>
        <p className="text-xl text-muted-foreground">Conheça a equipe por trás do projeto FlightOnTime</p>
      </div>

      <Card className="border-none shadow-xl bg-card">
        <CardHeader className="">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="">Equipe: AlcatelA</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Seção Data Science */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-b pb-2 text-[#5B9BD5] font-semibold">Data Science</h3>
              <ul className="space-y-4">
                {equipe.dataScience.map((membro, i) => (
                  <li key={i} className="flex items-center justify-between group">
                    <span className="text-white">{membro.nome}</span>
                    {membro.link && (
                      <a href={membro.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Seção Backend */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-b pb-2 text-[#5B9BD5] font-semibold">Backend</h3>
              <ul className="space-y-4">
                {equipe.backend.map((membro, i) => (
                  <li key={i} className="flex items-center justify-between group">
                    <span className="white">{membro.nome}</span>
                    {membro.link && (
                      <a href={membro.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;