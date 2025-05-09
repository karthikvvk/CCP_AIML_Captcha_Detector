import pyautogui
import time
import mouse

def move_straight(x_start, y_start, x_end, y_end, duration=1):
    steps = 50
    for i in range(steps):
        x = x_start + (x_end - x_start) * (i / steps)
        y = y_start + (y_end - y_start) * (i / steps)
        pyautogui.moveTo(x, y, duration / steps)

def get_click_position():
    print("Click anywhere to select the destination...")
    mouse.wait(button='left')  # Wait for left mouse click
    return mouse.get_position()

def main():
    x_target, y_target = get_click_position()
    print(f"Detected click at ({x_target}, {y_target})")
    
    start_x, start_y = 10, 10
    move_straight(start_x, start_y, x_target, y_target)
    
    pyautogui.click(x_target, y_target)
    print("Mouse moved and clicked at", x_target, y_target)

if __name__ == "__main__":
    main()