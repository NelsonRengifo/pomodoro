# Pomodoro Timer — Requirements (MVP)

## 1. Scope
This document defines the **minimum functional behavior** for a browser-based Pomodoro timer featuring **Work**, **Break**, and **Long Break** phases, with **Start / Pause / Reset** controls and automatic phase progression as specified.

## 2. Definitions
- **Pomodoro (Work session):** 25 minutes of focused work.  
- **Short Break:** 5 minutes, occurs after each Pomodoro except the 4th.  
- **Long Break:** 15 minutes, occurs **after the 4th** Pomodoro.  
- **Cycle:** One Work session followed by its subsequent break (short or long).  
- **Completed Pomodoro Count:** Number of finished Work sessions since last long break (1–4).

## 3. High-Level Behavior
1. The application **shall** begin in **Idle** state with phase set to **Work** and the timer display set to **25:00**.  
2. The **Start** control **shall** initiate the countdown for the **Work** phase.  
3. Upon completion of a **Work** phase:  
   - If the completed Pomodoro count is **< 4**, the app **shall** automatically start a **Short Break** (5:00).  
   - If the completed Pomodoro count becomes **4**, the app **shall** automatically start a **Long Break** (15:00).  
4. Upon completion of any Break (Short or Long):  
   - The app **shall** return to **Idle** with phase set to **Work** and timer set to **25:00**.  
   - If the just-finished break was a **Long Break**, the completed Pomodoro count **shall** reset to **0**.  
5. The **Pause** control **shall** suspend an active countdown without changing the current phase or remaining time.  
6. The **Reset** control **shall** stop any countdown, set phase to **Work**, reset remaining time to **25:00**, and set completed Pomodoro count to **0**.

## 4. Phase Logic & State Transitions

### 4.1 States
- **Idle (Work-ready):** waiting for user to press **Start**; phase=Work; remaining=25:00.  
- **Running:** countdown active (phase ∈ {Work, Short Break, Long Break}).  
- **Paused:** countdown suspended (phase unchanged; time preserved).

### 4.2 Transitions
- Idle → Running (Work): on **Start**.  
- Running (Work) → Running (Short Break): on reaching **00:00** with count **< 4**; increment completed Pomodoro count by **+1** and **auto-start** Short Break.  
- Running (Work) → Running (Long Break): on reaching **00:00** when incrementing completed Pomodoro count yields **4**; **auto-start** Long Break.  
- Running (Short/Long Break) → Idle (Work-ready): on reaching **00:00**; if Long Break just finished, set completed Pomodoro count to **0**.  
- Running → Paused: on **Pause**.  
- Paused → Running: on **Start** (resume).  
- Any state → Idle (Work-ready): on **Reset** (also resets count to **0**).

## 5. Timing Requirements
1. Work duration **shall** be **25 minutes**.  
2. Short Break duration **shall** be **5 minutes**.  
3. Long Break duration **shall** be **15 minutes**.  
4. The countdown **shall** display **MM:SS** with zero-padding on seconds.  
5. The timer **shall** compute remaining time based on a **target end timestamp** to maintain accuracy if the tab is throttled or loses focus.

## 6. Controls & UI Behavior
1. The UI **shall** provide **Start**, **Pause**, and **Reset** controls.  
2. **Start** **shall**:  
   - Begin Work when in Idle (Work-ready).  
   - Resume when in Paused.  
3. **Pause** **shall** suspend the current countdown when in Running.  
4. **Reset** **shall** stop any countdown and return to Idle (Work-ready) with 25:00 and completed Pomodoro count = 0.  
5. The current **phase label** (Work / Break / Long Break) **shall** be visible to the user.  
6. Control enablement **shall** reflect state:  
   - **Idle**: Start enabled; Pause disabled; Reset enabled.  
   - **Running**: Start disabled (or resume only when Paused); Pause enabled; Reset enabled.  
   - **Paused**: Start (resume) enabled; Pause disabled; Reset enabled.

## 7. Phase Progression & Counters
1. After each completed **Work** session, the completed Pomodoro count **shall** increment by **1**.  
2. When the completed Pomodoro count reaches **4** and that Work session completes, the next break **shall** be a **Long Break**.  
3. After completing a **Long Break**, the completed Pomodoro count **shall** reset to **0**.  
4. After completing a **Short Break**, the app **shall** return to Idle with **Work** selected (count preserved).

## 8. Sounds (Phase Transitions) — *Deferred for this MVP*
1. On every **phase change**, the system **shall** trigger a **distinct transition cue** (Work ↔ Break, Work → Long Break, Long Break → Work).  
2. Transition cues **shall not** loop.  
