import subprocess

profiles = subprocess.check_output("netsh wlan show profiles", shell=True).decode()
names = [line.split(":")[1].strip()
         for line in profiles.split("\n") if "All User Profile" in line]

for i, wifi in enumerate(names, 1):
    print(f"[{i}] {wifi}")
    result = subprocess.check_output(
        f'netsh wlan show profile name="{wifi}" key=clear',
        shell=True
    ).decode()
    for line in result.split("\n"):
        if "Key Content" in line:
            print(f"Password: {line.split(':')[1].strip()}")
            break
    print("-" * 40)
