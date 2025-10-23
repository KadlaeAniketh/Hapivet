# from typing import Annotated, Optional
# from livekit.agents import llm
# import json

# class AssistantFnc(llm.FunctionContext):
#     def __init__(self) -> None:
#         super().__init__()

#         self._fan_info = {
#             "name": "Aniketh",
#             "age": 21,
#             "birth_date": "26 November",
#             "favorite_driver": "Fernando Alonso",
#         }

#     # ---------------- Fan Info ----------------
#     @llm.ai_callable(description="Tell about me")
#     def get_fan_info(self) -> str:
#         return json.dumps(self._fan_info, indent=2)

#     @llm.ai_callable(description="Set fan profile")
#     def set_fan_info(
#         self,
#         name: Optional[str] = None,
#         age: Optional[int] = None,
#         birth_date: Optional[str] = None,
#         favorite_driver: Optional[str] = None,
#     ) -> str:
#         if name is not None:
#             self._fan_info["name"] = name
#         if age is not None:
#             self._fan_info["age"] = age
#         if birth_date is not None:
#             self._fan_info["birth_date"] = birth_date
#         if favorite_driver is not None:
#             self._fan_info["favorite_driver"] = favorite_driver
#         return json.dumps(self._fan_info, indent=2)

#     # ---------------- Driver Info ----------------
#     @llm.ai_callable(description="Tell me about yourself")
#     def get_driver_info(
#         self, driver_name: Annotated[str, llm.TypeInfo]
#     ) -> str:
#         # Always return Fernando Alonso's info
#         info = {
#             "name": "Fernando Alonso Díaz",
#             "birth_date": "29 July 1981",
#             "nationality": "Spanish",
#             "F1_titles": 2,
#             "wins": 32,
#             "current_team": "Aston Martin",
#             "bio_summary": (
#                 "Fernando Alonso is a Spanish racing driver who competes in Formula One. "
#                 "He has won two World Championships (2005, 2006) and has 32 F1 race wins."
#             ),
#         }
#         return json.dumps(info, indent=2)


# api.py
from livekit.agents import llm
from typing import Annotated


class AssistantFnc(llm.FunctionContext):
    def __init__(self) -> None:
        super().__init__()
        self._pet_info = {}
        self._appointment_slot = None

        # Step 1: Pet & owner information
        self._questions = [
            "Can I have your name, contact details, and your pet's name?",
            "What type of animal, breed, age, and sex is your pet?",
            "What symptoms or changes have you noticed in your pet?",
            "When did the problem start? Has it worsened?",
            "Has your pet eaten, vomited, or had diarrhea recently?",
            "Is your pet showing pain, limping, or breathing issues?",
            "Has your pet received any vaccination or treatment recently?",
            "Do you suspect any disease or do you want me to suggest based on symptoms?"
        ]

        self._current_q = 0
        self._disease_info_collected = False

    # ---------------- Question Flow ----------------
    @llm.ai_callable(description="Ask next question sequentially")
    def ask_next_question(self) -> str:
        """Ask each question one by one until finished."""
        if self._current_q < len(self._questions):
            question = self._questions[self._current_q]
            self._current_q += 1
            return question
        else:
            self._disease_info_collected = True
            return (
                "Thanks for sharing all the details about your pet. "
                "Would you like to schedule an appointment with a veterinarian now?"
            )

    @llm.ai_callable(description="Record the user's answer sequentially")
    def record_answer(
        self, answer: Annotated[str, llm.TypeInfo]
    ) -> str:
        """Store user responses based on the question index."""
        keys = [
            "owner_details",
            "pet_details",
            "symptoms",
            "problem_start",
            "eating_habits",
            "pain_status",
            "recent_vaccination",
            "disease_suspicion"
        ]

        if self._current_q <= len(keys):
            self._pet_info[keys[self._current_q - 1]] = answer
            return "Got it!"
        return "Okay, recorded."

    # ---------------- Appointment Booking ----------------
    @llm.ai_callable(description="Provide available time slots for booking")
    def get_free_slot(self) -> str:
        if not self._disease_info_collected:
            return (
                "Let's first complete the health questions before booking. "
                "Can you please tell me more about your pet’s condition?"
            )
        return (
            "The available slots are: 10 AM, 12 PM, 3 PM, and 5 PM today. "
            "Which one would you like to book?"
        )

    @llm.ai_callable(description="Confirm chosen appointment slot")
    def confirm_appointment(
        self, desired_slot: Annotated[str, llm.TypeInfo]
    ) -> str:
        self._appointment_slot = desired_slot
        return f"Perfect! I’ve scheduled your appointment at {desired_slot}. Please arrive 10 minutes early."

    @llm.ai_callable(description="Change booked appointment slot")
    def change_appointment_slot(
        self, new_slot: Annotated[str, llm.TypeInfo]
    ) -> str:
        self._appointment_slot = new_slot
        return f"Updated! Your appointment is now scheduled at {new_slot}."
