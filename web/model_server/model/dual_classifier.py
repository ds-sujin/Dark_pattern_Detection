# dual_classifier.py 안에 들어갈 코드

import torch.nn as nn
from transformers import BertModel

class DualClassifier(nn.Module):
    def __init__(self, num_category, num_predicate):
        super(DualClassifier, self).__init__()
        self.bert = BertModel.from_pretrained("bert-base-uncased")
        self.dropout = nn.Dropout(0.1)
        self.category_classifier = nn.Linear(self.bert.config.hidden_size, num_category)
        self.predicate_classifier = nn.Linear(self.bert.config.hidden_size, num_predicate)

    def forward(self, input_ids, attention_mask, token_type_ids=None):
        outputs = self.bert(
            input_ids=input_ids,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids
        )
        cls_output = self.dropout(outputs.pooler_output)
        cat_logits = self.category_classifier(cls_output)
        pred_logits = self.predicate_classifier(cls_output)
        return cat_logits, pred_logits