import time

class Temporizador:
    def __init__(self, tempo_foco=25, tempo_descanso=5, ciclos=4, tempo_entre_blocos=15):
        self.tempo_foco = tempo_foco
        self.tempo_descanso = tempo_descanso
        self.ciclos = ciclos
        self.tempo_entre_blocos = tempo_entre_blocos

    def executar(self):
        for ciclo in range(1, self.ciclos + 1):
            print(f"▶ Início do Foco {ciclo}/{self.ciclos}: {self.tempo_foco} min")
            self._contagem_regressiva(self.tempo_foco)
            print("⏹ Fim do foco!")

            if ciclo < self.ciclos:
                print(f"▶ Início do Descanso Curto: {self.tempo_descanso} min")
                self._contagem_regressiva(self.tempo_descanso)
                print("⏹ Fim da pausa curta!")

        # Descanso longo ao final do bloco
        print(f"▶ Início do Descanso Longo: {self.tempo_entre_blocos} min")
        self._contagem_regressiva(self.tempo_entre_blocos)
        print("⏹ Fim do Descanso longo!")
        print("✅ Bloco concluído!")

    def _contagem_regressiva(self, minutos):
        total_segundos = int(minutos) * 60
        for s in range(total_segundos, 0, -1):
            mm = s // 60
            ss = s % 60
            print(f"{mm:02d}:{ss:02d}", end="\r")
            time.sleep(1)
        print("00:00")
