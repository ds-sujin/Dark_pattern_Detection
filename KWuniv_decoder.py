import csv
import matplotlib.pyplot as plt
import pandas as pd

# 데이터 유형별 decoding 함수 정의
def decode_float16(hex_str, constant, dataSaveCnt):
    try:
        int_val = int(hex_str, 16)
        if int_val > 0x7FFF:
            int_val -= 0x10000
        return int_val / constant
    except ValueError as e:
        print(f"Error decoding float16: hex_str={hex_str}, constant={constant}, dataSaveCnt={dataSaveCnt}, error={e}")
        return None

def decode_uint8(hex_str, dataSaveCnt):
    try:
        return int(hex_str, 16)
    except ValueError as e:
        print(f"Error decoding uint8: hex_str={hex_str}, dataSaveCnt={dataSaveCnt}, error={e}")
        return None

def decode_uint16(hex_str, dataSaveCnt):
    try:
        return int(hex_str, 16)
    except ValueError as e:
        print(f"Error decoding uint16: hex_str={hex_str}, dataSaveCnt={dataSaveCnt}, error={e}")
        return None

def decode_uint32(hex_str):
    try:
        return int(hex_str, 16)
    except ValueError as e:
        print(f"Error decoding uint32: hex_str={hex_str}, error={e}")
        return None

def decode_uint64(hex_str):
    try:
        return int(hex_str, 16)
    except ValueError as e:
        print(f"Error decoding uint32: hex_str={hex_str}, error={e}")
        return None
    
# 상수 정의
DATA_CONV_CONST_16BIT = 65535           # 16Bit Resolution (2Byte)
GRF_RANGE_MAX = 4000                    # ADC 12Bit Resolution
VOLT_RANGE_MAX = 60                     # (Volt) 0 ~ 60V
DEG_ENC_RANGE_MAX = 720                 # (deg) -360 ~ +360
VELDEG_ENC_RANGE_MAX = 6000             # (deg) -3000 ~ +3000
RAD_ENC_RANGE_MAX = 2261.94624          # (rad) 720 * pi(3.141592)
RADVEL_RANGE_MAX = 17.4533              # (rad/s) -500 * pi/180 rad/s ~ +500 * pi/180 rad/s
CURRENT_RANGE_MAX = 360                 # (A) -180 ~ +180
GYRO_Z_RANGE_MAX = 1000                 # (deg/s) -500 ~ +500
SUM_FUZZY_INPUT_RANGE_MAX = 1000        # FuzzyInput0 + FuzzyInput2 0 ~ 1000
ACC_RANGE_MAX = 78.4532                 # (m/s^2) 8 * g(9.80665)
ACC_FUZZYINPUT_RANGE_MAX = 202.63       # (m/s^2) 8 * g(9.80665) * 23(FUZZY_LOGIC_SCALING_FACTOR)
MAG_RANGE_MAX = 2400                    # (micro Tesla) -1200 ~ +1200
WC_RANGE_MAX = 20                       # (Hz) 0 ~ 10Hz
MOTION_PHASE_RANGE_MAX = 200            # (%) -100 ~ + 100
TEMP_RANGE_MAX = 400                    # (°C) -200 ~ +200
EMG_NORM_RANGE_MAX = 2                  # [0,1], but we have to use 2
EMG_RAWSIGN_RANGE_MAX = 2               # [-1,1]
#Have to change
CONTROL_INPUT_MAX = 30

GRF_CONSTANT = DATA_CONV_CONST_16BIT / GRF_RANGE_MAX
VOLT_CONSTANT = DATA_CONV_CONST_16BIT / VOLT_RANGE_MAX
DEG_ENC_CONSTANT = DATA_CONV_CONST_16BIT / DEG_ENC_RANGE_MAX
VELDEG_ENC_CONSTANT = DATA_CONV_CONST_16BIT / VELDEG_ENC_RANGE_MAX
RAD_ENC_CONSTANT = DATA_CONV_CONST_16BIT / RAD_ENC_RANGE_MAX
RADVEL_CONSTANT = DATA_CONV_CONST_16BIT / RADVEL_RANGE_MAX
CURRENT_CONSTANT = DATA_CONV_CONST_16BIT / CURRENT_RANGE_MAX
GYRO_Z_CONSTANT = DATA_CONV_CONST_16BIT / GYRO_Z_RANGE_MAX
SUM_FUZ_INPUT_CONSTANT = DATA_CONV_CONST_16BIT / SUM_FUZZY_INPUT_RANGE_MAX
ACC_CONSTANT = DATA_CONV_CONST_16BIT / ACC_RANGE_MAX
ACC_FUZZYINPUT_CONSTANT = DATA_CONV_CONST_16BIT / ACC_FUZZYINPUT_RANGE_MAX
MAG_CONSTANT = DATA_CONV_CONST_16BIT / MAG_RANGE_MAX
WC_CONSTANT = DATA_CONV_CONST_16BIT / WC_RANGE_MAX
MOTION_PHASE_CONSTANT = DATA_CONV_CONST_16BIT / MOTION_PHASE_RANGE_MAX
TEMP_CONSTANT = DATA_CONV_CONST_16BIT / TEMP_RANGE_MAX
EMG_NORM_CONSTANT = DATA_CONV_CONST_16BIT / EMG_NORM_RANGE_MAX
EMG_RAWSIGN_CONSTANT = DATA_CONV_CONST_16BIT / EMG_RAWSIGN_RANGE_MAX      
#Have to change
CONTROL_INPUT_CONSTANT = DATA_CONV_CONST_16BIT / CONTROL_INPUT_MAX 

# 필드 정보 및 변환 상수 사전
fields_info = {
    # CM Data #
    'loopCnt': ('uint32', None),
    # 'FSM_State_Current': ('uint16', None),
    # 'Theta_Trunk' : ('float16', DEG_ENC_CONSTANT),
    # 'gaitCount': ('uint32', None),
    # 'CM_gyroY': ('float16', GYRO_Z_CONSTANT),
    # 'CM_gyroZ': ('float16', GYRO_Z_CONSTANT),
    # 'CM_magX': ('float16', MAG_CONSTANT),
    # 'CM_magY': ('float16', MAG_CONSTANT),
    # 'CM_magZ': ('float16', MAG_CONSTANT),

    # 'ref_angle_RH': ('float16', DEG_ENC_CONSTANT),
    # 'ref_angle_LH': ('float16', DEG_ENC_CONSTANT),
    # 'ref_angle_RK': ('float16', DEG_ENC_CONSTANT),
    # 'ref_angle_LK': ('float16', DEG_ENC_CONSTANT),
    # 'act_angle_RH': ('float16', DEG_ENC_CONSTANT),
    # 'act_angle_LH': ('float16', DEG_ENC_CONSTANT),
    # 'act_angle_RK': ('float16', DEG_ENC_CONSTANT),
    # 'act_angle_LK': ('float16', DEG_ENC_CONSTANT),
    # 'data_marker': ('uint8', None),
    # 'ref_cnt': ('uint32', None),
    # 'batVolt': ('float16', VOLT_CONSTANT),
    # 'batCurr': ('float16', CURRENT_CONSTANT),
    # 'Comp_State': ('uint8', None),
    # 'Theta_Trunk' : ('float16', DEG_ENC_CONSTANT),
    # 'accX_global_RK': ('float16', ACC_CONSTANT),
    # 'accY_global_RK': ('float16', ACC_CONSTANT),
    # 'accX_global_LK': ('float16', ACC_CONSTANT),
    # 'accY_global_LK': ('float16', ACC_CONSTANT),
    # 'dPLeftShank_X': ('float16', 1000),
    # 'dPRightShank_X': ('float16', 1000),
    # 'ThetaLShank': ('float16', 10),
    # 'ThetaRShank': ('float16', 10),
    # 'P2L_Y': ('float16', 100),
    # 'P2R_Y': ('float16', 100),
    # 'SingleStance': ('uint8', None),
    # 'LeftFootContact': ('uint8', None),
    # 'RightFootContact': ('uint8', None),
    # 'ISI_Stationary': ('uint8', None),
    # 'MotionCheck': ('float16', 100),
    # 'velXEstimation': ('float16', 100),
    # 'velYEstimation': ('float16', 100),
    # 'velXLPF': ('float16', 1000),
    # 'velYLPF': ('float16', 1000),
    # 'posX': ('float16', 1000),
    # 'posY': ('float16', 1000),
    # 'gaitCount': ('uint32', None),
    # 'GaitInstances': ('uint32', None),
    # 'GaitStop': ('uint8', None),
    # 'FirstStep': ('uint8', None),
    # 'RHamplitude': ('float16', 100),
    # 'RHamplitude_max': ('float16', 100),
    # 'RHamplitude_min': ('float16', 100),
    # 'LHamplitude': ('float16', 100),
    # 'LHamplitude_max': ('float16', 100),
    # 'LHamplitude_min': ('float16', 100),
    # 'GaitPeriod': ('float16', 100),
    # 'Cadence': ('float16', 100),
    # 'forwardVelSmoothed': ('float16', 100),
    # 'forwardDistance': ('float16', 100),
    # 'CM_SagitalDeg': ('float16', DEG_ENC_CONSTANT),
    # 'CM_FrontalDeg': ('float16', DEG_ENC_CONSTANT),
    # 'BFlags': ('uint64', None),
    # 'ISI': ('uint64', None),

    # RH Data #
    'thighDeg_RH': ('float16', DEG_ENC_CONSTANT),
    # 'thighVelDeg_RH': ('float16', VELDEG_ENC_CONSTANT),
    # 'thighVelDeg_DiffINC_RH': ('float16', VELDEG_ENC_CONSTANT),
    # 'thighVelDeg_Diff_RH': ('float16', VELDEG_ENC_CONSTANT),
    'incPosDeg_RH': ('float16', DEG_ENC_CONSTANT),
    # 'incVelDeg_RH': ('float16', VELDEG_ENC_CONSTANT),
    # 'incVelDeg_Diff_RH': ('float16', VELDEG_ENC_CONSTANT),
    # 'imuTVCFDeg_RH': ('float16', DEG_ENC_CONSTANT),
    'MotorRefCurrent_RH': ('float16', CURRENT_CONSTANT),
    'MotorActCurrent_RH': ('float16', CURRENT_CONSTANT),
    'FvectorRefCurrent_RH': ('float16', CURRENT_CONSTANT),
    'accX_Global_RH': ('float16', ACC_CONSTANT),
    'accY_Global_RH': ('float16', ACC_CONSTANT),
    # 'accZ_Global_RH': ('float16', ACC_CONSTANT),
    # 'gyroX_Global_RH': ('float16', GYRO_Z_CONSTANT),
    # 'gyroY_Global_RH': ('float16', GYRO_Z_CONSTANT),
    'gyroZ_Global_RH': ('float16', GYRO_Z_CONSTANT),
    # 'gyroX_Raw_RH': ('float16', GYRO_Z_CONSTANT),
    # 'gyroY_Raw_RH': ('float16', GYRO_Z_CONSTANT),
    # 'gyroZ_Raw_RH': ('float16', GYRO_Z_CONSTANT),
    # 'FuzzyInput0_calib_RH': ('float16', GYRO_Z_CONSTANT),
    # 'FuzzyInput2_calib_RH': ('float16', GYRO_Z_CONSTANT),
    # 'MotorTemp_RH': ('float16', TEMP_CONSTANT),
    # 'FSR_middleToe_RH': ('uint16', None),
    # 'FSR_bigToe_RH': ('uint16', None),
    # 'FSR_littleToe_RH': ('uint16', None),
    # 'FSR_Heel_RH': ('uint16', None),
 
    # LH Data #
    'thighDeg_LH': ('float16', DEG_ENC_CONSTANT),
    # 'thighVelDeg_LH': ('float16', VELDEG_ENC_CONSTANT),
    # 'thighVelDeg_DiffINC_LH': ('float16', VELDEG_ENC_CONSTANT),
    # 'thighVelDeg_Diff_LH': ('float16', VELDEG_ENC_CONSTANT),
    'incPosDeg_LH': ('float16', DEG_ENC_CONSTANT),
    # 'incVelDeg_LH': ('float16', VELDEG_ENC_CONSTANT),
    # 'incVelDeg_Diff_LH': ('float16', VELDEG_ENC_CONSTANT),
    # 'imuTVCFDeg_LH': ('float16', DEG_ENC_CONSTANT),
    'MotorRefCurrent_LH': ('float16', CURRENT_CONSTANT),
    'MotorActCurrent_LH': ('float16', CURRENT_CONSTANT),
    'FvectorRefCurrent_LH': ('float16', CURRENT_CONSTANT),
    'accX_Global_LH': ('float16', ACC_CONSTANT),
    'accY_Global_LH': ('float16', ACC_CONSTANT),
    # 'accZ_Global_LH': ('float16', ACC_CONSTANT),
    # 'gyroX_Global_LH': ('float16', GYRO_Z_CONSTANT),
    # 'gyroY_Global_LH': ('float16', GYRO_Z_CONSTANT),
    'gyroZ_Global_LH': ('float16', GYRO_Z_CONSTANT),
    # 'gyroX_Raw_LH': ('float16', GYRO_Z_CONSTANT),
    # 'gyroY_Raw_LH': ('float16', GYRO_Z_CONSTANT),
    # 'gyroZ_Raw_LH': ('float16', GYRO_Z_CONSTANT),
    # 'MotorRefCurrent_LH': ('float16', CURRENT_CONSTANT),
    # 'MotorActCurrent_LH': ('float16', CURRENT_CONSTANT),
    # 'gyroZ_calib_LH': ('float16', GYRO_Z_CONSTANT),
    # 'FuzzyInput0_calib_LH': ('float16', GYRO_Z_CONSTANT),
    # 'FuzzyInput2_calib_LH': ('float16', GYRO_Z_CONSTANT),
    # 'MotorTemp_LH': ('float16', TEMP_CONSTANT),
    # 'FSR_middleToe_LH': ('uint16', None),
    # 'FSR_bigToe_LH': ('uint16', None),
    # 'FSR_littleToe_LH': ('uint16', None),
    # 'FSR_Heel_LH': ('uint16', None),

    # RK Data (for Expansion Board) #
    'u_RH' : ('float16', CONTROL_INPUT_CONSTANT),
    'u_LH' : ('float16', CONTROL_INPUT_CONSTANT),
    'EMG_Raw' : ('float16', EMG_RAWSIGN_CONSTANT),
    'EMG_Processed' : ('float16', EMG_NORM_CONSTANT),
    'Pvector_ref_RH' : ('float16', DEG_ENC_CONSTANT),
    'Pvector_ref_LH' : ('float16', DEG_ENC_CONSTANT),
    'extension_control_mode' : ('uint8', None),
    # 계속해서 필요한 필드를 추가
}

# Hex 데이터를 CSV 파일에 쓰는 함수
def write_csv_from_hex(hex_data_file, csv_file):
    fieldnames = list(fields_info.keys())  # 동적으로 필드 이름 생성
 
    with open(csv_file, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
 
        with open(hex_data_file, 'rb') as hex_file:
            lines = hex_file.readlines()[:-1]  # 모든 줄을 읽어옴
            for i, line in enumerate(lines):
                cleaned_line = line.replace(b'\x00', b'').decode('utf-8', errors='ignore').strip()
                # x00 데이터를 제거한 나머지 데이터를 처리
 
                hex_data = cleaned_line.strip()  # 앞뒤 공백 제거
                data = {}
                cursor = 0
 
                # breakpoint()
               
                # loopCnt 값 처리
                data['loopCnt'] = decode_uint32(hex_data[cursor:cursor+8])
                cursor += 8
           
                # 나머지 데이터 처리
                for field, (type_func, constant) in fields_info.items():
                    if field != 'loopCnt':  # loopCnt 이미 처리됨
                        try:
                            if type_func == 'float16' and cursor + 4 <= len(hex_data):
                                data[field] = f"{decode_float16(hex_data[cursor:cursor+4], constant, data['loopCnt']):.3f}"
                                cursor += 4
                            elif type_func == 'uint32' and cursor + 8 <= len(hex_data):
                                data[field] = decode_uint32(hex_data[cursor:cursor+8])
                                cursor += 8
                            elif type_func == 'uint8' and cursor + 2 <= len(hex_data):
                                data[field] = decode_uint8(hex_data[cursor:cursor+2], data['loopCnt'])
                                cursor += 2
                            elif type_func == 'uint16' and cursor + 4 <= len(hex_data):
                                data[field] = decode_uint16(hex_data[cursor:cursor+4], data['loopCnt'])
                                cursor += 4
                        except ValueError as e:
                            print(f"Error processing line: {line}, error: {e}")
                            continue
 
                writer.writerow(data)

# 예시 Hex 데이터 파일 경로
hex_data_file = r"/Users/jungsujin/Dark_pattern_Detection/SUIT_LOGGED_DATA-1.csv"

# 결과 CSV 파일 경로
csv_file = r"/Users/jungsujin/Dark_pattern_Detection/SUIT_LOGGED_DATA-2.csv"

# Hex 데이터를 CSV 파일에 쓰기
write_csv_from_hex(hex_data_file, csv_file)

# 디코딩된 CSV 데이터 읽기
df = pd.read_csv(csv_file)

# 그래프 그리기: EMG_Raw만
plt.figure(figsize=(10, 5))
plt.plot(df['loopCnt'], df['EMG_Raw'], label='EMG Raw', color='red', linewidth=1)
plt.xlabel('Loop Count')
plt.ylabel('EMG Raw Signal')
plt.title('EMG Raw Signal Over Time')
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()
