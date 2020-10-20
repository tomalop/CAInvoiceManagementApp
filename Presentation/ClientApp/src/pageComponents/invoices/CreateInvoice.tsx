import React, { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import { Card, CardBody, Row, Col, Input, FormGroup, Label, Table, Button, CardFooter } from "reactstrap";
import { CreateInvoiceCommand, DiscountType, TaxType, InvoiceItemVm, InvoicesClient } from "../../utils/api";
import { getSubtotal, getTotal, getBalance } from "../../utils/invoiceUtils";
import moment from "moment";
import "./CreateInvoice.scss";

interface Props {}

const CreateInvoice = (props: Props) => {
  const [selectedDateFocus, setSelectedDateFocus] = useState<boolean | null>(false);
  const [selectedDueDateFocus, setSelectedDueDateFocus] = useState<boolean | null>(false);
  const initValue = new CreateInvoiceCommand({
    invoiceNumber: "",
    logo: "",
    from: "",
    to: "",
    date: undefined,
    paymentTerms: "",
    dueDate: undefined,
    discount: undefined,
    discountType: DiscountType.Percentage,
    tax: undefined,
    taxType: TaxType.Percentage,
    amountPaid: undefined,
    invoiceItems: [new InvoiceItemVm({ id: 0, item: "", quantity: undefined, rate: undefined, amount: 0 })],
  });

  const [invoiceData, setInvoiceData] = useState<CreateInvoiceCommand>(initValue);

  const client = new InvoicesClient();

  const updateInvoiceItem = (property: "item" | "quantity" | "rate", index: number, value: any) => {
    if (invoiceData && invoiceData.invoiceItems) {
      const items: any = [...invoiceData.invoiceItems];
      items[index][property] = value;
      setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, invoiceItems: [...items] }));
    }
  };

  const addInvoiceItem = () => {
    if (invoiceData && invoiceData.invoiceItems) {
      const items = [...invoiceData.invoiceItems];
      items.push(new InvoiceItemVm({ id: 0, item: "", quantity: undefined, rate: undefined, amount: 0 }));
      setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, invoiceItems: [...items] }));
    }
  };

  return (
    <div className="createInvoice">
      <Card>
        <CardBody>
          <Row>
            <Col md={6}>
              <Input
                type="text"
                placeholder="Logo image url"
                className="input logo"
                value={invoiceData.logo}
                onChange={(onInputChangeEvent: any) =>
                  setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, logo: onInputChangeEvent.target.value }))
                }
              />
              <Input
                type="textarea"
                placeholder="Who is this invoice from? (required)"
                className="input"
                value={invoiceData.from}
                onChange={(onInputChangeEvent: any) =>
                  setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, from: onInputChangeEvent.target.value }))
                }
              />
              <Input
                type="textarea"
                placeholder="Who is this invoice to? (required)"
                className="input"
                value={invoiceData.to}
                onChange={(onInputChangeEvent: any) =>
                  setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, to: onInputChangeEvent.target.value }))
                }
              />
            </Col>
            <Col md={6}>
              <FormGroup row>
                <Label md={4}>Invoice #</Label>
                <Col md={8}>
                  <Input
                    type="text"
                    placeholder="Invoice number"
                    value={invoiceData.invoiceNumber}
                    onChange={(onInputChangeEvent: any) =>
                      setInvoiceData(
                        new CreateInvoiceCommand({ ...invoiceData, invoiceNumber: onInputChangeEvent.target.value })
                      )
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={4}>Date</Label>
                <Col md={8}>
                  <SingleDatePicker
                    placeholder="Date"
                    isOutsideRange={() => false}
                    id="date-picker"
                    small
                    block
                    numberOfMonths={1}
                    date={invoiceData.date ? moment(invoiceData.date) : null}
                    onDateChange={(date) =>
                      setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, date: date ?? undefined }))
                    }
                    focused={selectedDateFocus}
                    onFocusChange={({ focused }) => setSelectedDateFocus(focused)}
                    hideKeyboardShortcutsPanel
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={4}>Payment Terms</Label>
                <Col md={8}>
                  <Input
                    type="text"
                    placeholder="Payment terms"
                    value={invoiceData.paymentTerms}
                    onChange={(onInputChangeEvent: any) =>
                      setInvoiceData(
                        new CreateInvoiceCommand({ ...invoiceData, paymentTerms: onInputChangeEvent.target.value })
                      )
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={4}>Due Date</Label>
                <Col md={8}>
                  <SingleDatePicker
                    placeholder="Due date"
                    isOutsideRange={() => false}
                    id="due-date-picker"
                    small={true}
                    block={true}
                    numberOfMonths={1}
                    date={invoiceData.dueDate ? moment(invoiceData.dueDate) : null}
                    onDateChange={(date) =>
                      setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, dueDate: date ?? undefined }))
                    }
                    focused={selectedDueDateFocus}
                    onFocusChange={({ focused }) => setSelectedDueDateFocus(focused)}
                    hideKeyboardShortcutsPanel={true}
                  />
                </Col>
              </FormGroup>
              <Row className="font-weight-bold">
                <Label md={4}>Balance</Label>
                <Label md={8}>{getBalance(invoiceData)}</Label>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Table striped>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.invoiceItems &&
                    invoiceData.invoiceItems.map((invoiceItem: InvoiceItemVm, index: number) => (
                      <tr key={`item-${index}`}>
                        <td>
                          <Input
                            type="text"
                            placeholder="Item description"
                            value={invoiceItem.item}
                            onChange={(onInputChangeEvent: any) =>
                              updateInvoiceItem("item", index, onInputChangeEvent.target.value)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="number"
                            placeholder="0"
                            value={invoiceItem.quantity || ""}
                            onChange={(onInputChangeEvent: any) =>
                              updateInvoiceItem(
                                "quantity",
                                index,
                                onInputChangeEvent.target.value ? parseInt(onInputChangeEvent.target.value) : undefined
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="number"
                            placeholder="0"
                            value={invoiceItem.rate || ""}
                            onChange={(onInputChangeEvent: any) =>
                              updateInvoiceItem(
                                "rate",
                                index,
                                onInputChangeEvent.target.value ? parseInt(onInputChangeEvent.target.value) : undefined
                              )
                            }
                          />
                        </td>
                        <td>{invoiceItem.quantity && invoiceItem.rate && invoiceItem.quantity * invoiceItem.rate}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Button className="btn btn-primary" onClick={() => addInvoiceItem()}>
                Add Item
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup row>
                <Label md={4}>Subtotal</Label>
                <Col md={4}>
                  <Input type="number" placeholder="0" value={getSubtotal(invoiceData.invoiceItems)} disabled />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4}>Discount</Label>
                <Col md={4}>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    max="100"
                    value={invoiceData.discount || ""}
                    onChange={(onInputChangeEvent: any) =>
                      setInvoiceData(
                        new CreateInvoiceCommand({
                          ...invoiceData,
                          discount: onInputChangeEvent.target.value
                            ? parseInt(onInputChangeEvent.target.value)
                            : undefined,
                        })
                      )
                    }
                  />
                </Col>
                <Col md={4}>
                  <Input
                    type="select"
                    value={invoiceData.discountType}
                    onChange={(onInputChangeEvent: any) =>
                      setInvoiceData(
                        new CreateInvoiceCommand({ ...invoiceData, discountType: onInputChangeEvent.target.value })
                      )
                    }>
                    <option value={DiscountType.Flat}>Flat rate</option>
                    <option value={DiscountType.Percentage}>Percentage</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4}>Tax</Label>
                <Col md={4}>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={invoiceData.tax || ""}
                    onChange={(onInputChangeEvent: any) =>
                      setInvoiceData(
                        new CreateInvoiceCommand({
                          ...invoiceData,
                          tax: onInputChangeEvent.target.value ? parseInt(onInputChangeEvent.target.value) : undefined,
                        })
                      )
                    }
                  />
                </Col>
                <Col md={4}>
                  <Input
                    type="select"
                    value={invoiceData.taxType}
                    onChange={(evt: any) =>
                      setInvoiceData(new CreateInvoiceCommand({ ...invoiceData, taxType: evt.target.value }))
                    }>
                    <option value={TaxType.Flat}>Flat rate</option>
                    <option value={TaxType.Percentage}>Percentage</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="font-weight-bold" md={4}>Total</Label>
                <Col md={4}>
                  <Input type="number" placeholder="0" value={getTotal(invoiceData)} className="font-weight-bold" disabled />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4}>Amount Paid</Label>
                <Col md={4}>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={invoiceData.amountPaid || ""}
                    onChange={(evt: any) =>
                      setInvoiceData(
                        new CreateInvoiceCommand({
                          ...invoiceData,
                          amountPaid: evt.target.value ? parseInt(evt.target.value) : undefined,
                        })
                      )
                    }
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Button
            className="btn btn-primary"
            onClick={() => {
              client
                .create(invoiceData)
                .then(() => console.log("success"))
                .catch(() => console.log("error"));
            }}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateInvoice;
