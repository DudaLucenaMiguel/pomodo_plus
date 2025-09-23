# app.py
from temporizador import Temporizador

db = {
    1: {"tempo_foco": 25, "tempo_descanso": 5, "ciclos": 4, "tempo_entre_blocos": 15},
    2: {"tempo_foco": 15, "tempo_descanso": 3, "ciclos": 4, "tempo_entre_blocos": 10},
    3: {"tempo_foco": 1,  "tempo_descanso": 1, "ciclos": 8, "tempo_entre_blocos": 2},
    4: {"tempo_foco": 50, "tempo_descanso": 10, "ciclos": 3, "tempo_entre_blocos": 30},
}

def _titulo_cfg(num: int, cfg: dict) -> str:
    return (f"Ciclo {num} ({cfg['ciclos']} ciclos "
            f"{cfg['tempo_foco']}x{cfg['tempo_descanso']} "
            f"com pausa longa de {cfg['tempo_entre_blocos']} min)")

def mostrar_menu() -> None:
    print("\n=== Escolha um ciclo de estudo ===")
    for num, cfg in db.items():
        print(f"{num}. {_titulo_cfg(num, cfg)}")
    print("5. Ciclo Personalizado (defina os tempos)")
    print("0. Sair")

def ler_inteiro(msg: str, minimo: int = 1) -> int:
    while True:
        val = input(msg).strip()
        try:
            v = int(val)
            if v < minimo:
                print(f"❌ Informe um número inteiro ≥ {minimo}.")
                continue
            return v
        except ValueError:
            print("❌ Digite um número inteiro válido.")

def criar_ciclo_personalizado() -> dict:
    print("\n--- Criar ciclo personalizado ---")
    foco = ler_inteiro("Tempo de foco (min): ", minimo=1)
    pausa = ler_inteiro("Tempo de descanso curto (min): ", minimo=1)
    ciclos = ler_inteiro("Quantidade de ciclos: ", minimo=1)
    longa = ler_inteiro("Descanso longo ao fim do bloco (min): ", minimo=1)
    return {
        "tempo_foco": foco,
        "tempo_descanso": pausa,
        "ciclos": ciclos,
        "tempo_entre_blocos": longa
    }

def ler_escolha():
    while True:
        escolha = input("Digite o número da opção (0-5): ").strip()
        if escolha == "0":
            return None
        if escolha == "5":
            return 5
        try:
            e = int(escolha)
            if e in db:
                return e
            print("❌ Opção inválida. Tente novamente.")
        except ValueError:
            print("❌ Entrada inválida. Tente novamente.")

def main():
    try:
        while True:
            mostrar_menu()
            op = ler_escolha()
            if op is None:
                print("Encerrando. 👋")
                break

            if op == 5:
                cfg = criar_ciclo_personalizado()
            else:
                cfg = db[op]

            print("\n✅ Iniciando...")
            Temporizador(**cfg).executar()

            de_novo = input("\nDeseja rodar outro ciclo? (s/n): ").strip().lower()
            if de_novo != "s":
                print("Até mais! 👋")
                break
    except KeyboardInterrupt:
        print("\nInterrompido pelo usuário. 👋")

if __name__ == "__main__":
    main()
