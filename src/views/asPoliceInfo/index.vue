<template>
  <div>
    <div class="buttons">
      <div class="button-area">
        <button id="1" class="first" @click="click(1)">基本信息</button>
        <div class="seq">|</div>
        <button id="2" @click="click(2)">工作信息</button>
        <div class="seq">|</div>
        <button id="3" @click="click(3)">政治面貌</button>
        <div class="seq">|</div>
        <button id="4" @click="click(4)">人事关系</button>
        <div class="seq">|</div>
        <button id="5" class="last" @click="click(5)">其他情况</button>
      </div>
    </div>
    <div class="policeInfo">
      <div v-if="choice === 1">
        <el-form>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*姓名">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.name"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.name"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*性别">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.gender"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.gender"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in gender"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*民族">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.folk"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.folk"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in folk"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                  <el-option label="其他" value="1" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="警号">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.policeNumber"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.policeNumber"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*籍贯">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.nativePlace"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  v-model="basicInfoVoListEdit.nativePlace"
                  :placeholder="basicInfoVoList.nativePlace"
                  :options="place"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*血型">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.bloodType"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.bloodType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in bloodType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*出生日期">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.birthday"
                  style="width: auto"
                  readonly
                />
                <el-date-picker
                  v-if="edit"
                  v-model="basicInfoVoListEdit.birthday"
                  type="date"
                  :placeholder="basicInfoVoListEdit.birthday"
                  value-format="yyyy-MM-dd"
                />
                <!-- :placeholder=basicInfoVoListEdit.birthday -->
                <!-- value-format="timestamp" -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*人员类别">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.personnelType"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  v-model="basicInfoVoListEdit.personnelType"
                  :placeholder="basicInfoVoList.personnelType"
                  :options="personnelType"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*人员状态">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.status"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  v-model="basicInfoVoListEdit.status"
                  :placeholder="basicInfoVoList.status"
                  :options="status"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*警员标志库">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.isInPoliceOfficerLibrary"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.isInPoliceOfficerLibrary"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in isYes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*出生地">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.birthplace"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  ref="birthplace"
                  v-model="basicInfoVoListEdit.birthplace"
                  :placeholder="basicInfoVoList.birthplace"
                  :options="place"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成长地">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.growingPlace"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  v-model="basicInfoVoListEdit.growingPlace"
                  :placeholder="basicInfoVoList.growingPlace"
                  :options="place"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="户口性质">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.accountType"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.accountType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in accountType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*户籍所在地名称">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.registerResidenceLocation"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  v-model="basicInfoVoListEdit.registerResidenceLocation"
                  :placeholder="basicInfoVoList.registerResidenceLocation"
                  :options="place"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*个人身份">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.identity"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  v-model="basicInfoVoListEdit.identity"
                  :placeholder="basicInfoVoList.identity"
                  :options="identity"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*居民身份证号码">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.idNumber"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.idNumber"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.maritalStatus"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  v-model="basicInfoVoListEdit.maritalStatus"
                  :placeholder="basicInfoVoList.maritalStatus"
                  :options="maritalStatus"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*涉密标志">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.isClassified"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.isClassified"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in isYes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*健康状况">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.healthCondition"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  v-model="basicInfoVoListEdit.healthCondition"
                  :placeholder="basicInfoVoList.healthCondition"
                  :options="healthCondition"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="户籍所在地详址">
                <el-input
                  v-if="!edit"
                  v-model="
                    basicInfoVoList.detailedLocationOfRegisteredResidence
                  "
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="
                    basicInfoVoListEdit.detailedLocationOfRegisteredResidence
                  "
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="暂缓列入套改实施范围原因类别">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.postponeReason"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.postponeReason"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in postponeReason"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="现任职级">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.rank"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.rank"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in rankType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-else-if="choice === 2">
        <el-form>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*参加工作日期">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.workJoinDate"
                  style="width: auto"
                  readonly
                />
                <el-date-picker
                  v-if="edit"
                  v-model="basicInfoVoListEdit.workJoinDate"
                  type="date"
                  :placeholder="basicInfoVoListEdit.workJoinDate"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*参加公安工作日期">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.policeWorkJoinDate"
                  style="width: auto"
                  readonly
                />
                <el-date-picker
                  v-if="edit"
                  v-model="basicInfoVoListEdit.policeWorkJoinDate"
                  type="date"
                  :placeholder="basicInfoVoListEdit.policeWorkJoinDate"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="基层工作经历时间">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.timeOfWorkAtGrassRootsLevel"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.timeOfWorkAtGrassRootsLevel"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*工龄计算校正值">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.correctionValueOfWorkingYears"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.correctionValueOfWorkingYears"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*警衔应加学制年限">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.policeRankSchoolingLength"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.policeRankSchoolingLength"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-else-if="choice === 3">
        <el-form>
          <el-row>
            <el-col :span="8">
              <el-form-item label="政治面貌">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.politicalStatus"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.politicalStatus"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in politicalStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="参加组织日期">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.dateOfJoiningTheOrganizations"
                  style="width: auto"
                  readonly
                />
                <el-date-picker
                  v-if="edit"
                  v-model="basicInfoVoListEdit.dateOfJoiningTheOrganizations"
                  type="date"
                  :placeholder="
                    basicInfoVoListEdit.dateOfJoiningTheOrganizations
                  "
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-else-if="choice === 4">
        <el-form>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*工作单位代码">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.workplace"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.workplace"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="*单位代码">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.workplaceCode"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.workplaceCode"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关系所在单位">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.workplaceName"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.workplaceName"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*所属部门和警种">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.departmentAndPoliceType"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  v-model="basicInfoVoListEdit.departmentAndPoliceType"
                  :placeholder="basicInfoVoList.departmentAndPoliceType"
                  :options="departmentAndPoliceTypeAndStaffPosition"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职务简称">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.abbreviationOfPosition"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.abbreviationOfPosition"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职务全称">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.fullNameOfPosition"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.fullNameOfPosition"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="人员工作岗位">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.staffPosition"
                  style="width: auto"
                  readonly
                />
                <el-cascader
                  v-if="edit"
                  v-model="basicInfoVoListEdit.staffPosition"
                  :placeholder="basicInfoVoList.staffPosition"
                  :options="departmentAndPoliceTypeAndStaffPosition"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="协管干部标识">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.identificationOfAssistantCadres"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.identificationOfAssistantCadres"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in identificationOfAssistantCadres"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否是协管干部">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.isAssistantCadres"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.isAssistantCadres"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in isYes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="*管理类别">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.managementCategory"
                  style="width: auto"
                  readonly
                />
                <el-select
                  v-if="edit"
                  v-model="basicInfoVoListEdit.managementCategory"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in managementCategory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-else-if="choice === 5">
        <el-form>
          <el-row>
            <el-col :span="8">
              <el-form-item label="专长">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.talent"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.talent"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="奖励综述">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.awards"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.awards"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年度考核综述">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.annualAssessment"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.annualAssessment"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input
                  v-if="!edit"
                  v-model="basicInfoVoList.remarks"
                  style="width: auto"
                  readonly
                />
                <el-input
                  v-if="edit"
                  v-model="basicInfoVoListEdit.remarks"
                  style="width: auto"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="operate">
      <el-button v-if="!edit" type="primary" @click="editInfo">编辑</el-button>
      <el-button v-if="edit" type="primary" @click="submitPoliceInfo">提交</el-button>
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import enums from "../../enums/enums";
import decode from "../../enums/decode";
import { getPoliceInfoById, updateBasicInfo } from "../../apis/basicinfo";
import { findCode, getCode, getTime } from "./index";
export default {
  name: "ChangeStyle",
  data() {
    return {
      choice: 1,
      edit: false,
      basicInfoVoList: {
        id: 0,
        department: "",
        // 基本信息
        name: "",
        gender: "",
        folk: "",
        birthday: "",
        status: 0,
        bloodType: "",
        isInPoliceOfficerLibrary: 0,
        policeNumber: "",
        personnelType: "",
        nativePlace: "",
        birthplace: "",
        growingPlace: "",
        accountType: 0,
        registerResidenceLocation: "",
        identity: "",
        idNumber: "",
        maritalStatus: "",
        isClassified: 0,
        healthCondition: "",
        detailedLocationOfRegisteredResidence: "",
        postponeReason: "",
        // 工作信息
        workJoinDate: 0,
        policeWorkJoinDate: 0,
        timeOfWorkAtGrassRootsLevel: "",
        correctionValueOfWorkingYears: 0,
        policeRankSchoolingLength: 0,
        // 政治面貌
        politicalStatus: "",
        dateOfJoiningTheOrganizations: 0,
        // 人事关系
        workplace: "",
        workplaceCode: "",
        workplaceName: "",
        departmentAndPoliceType: "",
        abbreviationOfPosition: "",
        fullNameOfPosition: "",
        staffPosition: "",
        identificationOfAssistantCadres: "",
        isAssistantCadres: 0,
        managementCategory: "",
        // 其他情况
        talent: "",
        awards: "",
        annualAssessment: "",
        remarks: "",
        rankType: "",
      },
      basicInfoVoListEdit: {
        id: 0,
        department: "",
        // 基本信息
        name: "张三",
        gender: "",
        folk: "",
        birthday: "",
        status: 0,
        bloodType: "",
        isInPoliceOfficerLibrary: 0,
        policeNumber: "",
        personnelType: "",
        nativePlace: "",
        birthplace: "",
        growingPlace: "",
        accountType: 0,
        registerResidenceLocation: "",
        identity: "",
        idNumber: "",
        maritalStatus: "",
        isClassified: 0,
        healthCondition: "",
        detailedLocationOfRegisteredResidence: "",
        postponeReason: "",
        // 工作信息
        workJoinDate: 0,
        policeWorkJoinDate: 0,
        timeOfWorkAtGrassRootsLevel: "",
        correctionValueOfWorkingYears: 0,
        policeRankSchoolingLength: 0,
        // 政治面貌
        politicalStatus: "",
        dateOfJoiningTheOrganizations: 0,
        // 人事关系
        workplace: "",
        workplaceCode: "",
        workplaceName: "",
        departmentAndPoliceType: "",
        abbreviationOfPosition: "",
        fullNameOfPosition: "",
        staffPosition: "",
        identificationOfAssistantCadres: "",
        isAssistantCadres: 0,
        managementCategory: "",
        // 其他情况
        talent: "",
        awards: "",
        annualAssessment: "",
        remarks: "",
        rankType: "",
      },
      // 一级选择
      folk: [],
      gender: [],
      bloodType: [],
      accountType: [],
      isYes: [],
      postponeReason: [],
      politicalStatus: [],
      identificationOfAssistantCadres: [],
      managementCategory: [],
      rankType: [],
      // 级联选择
      status: [],
      personnelType: [],
      identity: [],
      maritalStatus: [],
      healthCondition: [],
      departmentAndPoliceTypeAndStaffPosition: [],
      place: [],
      formInline: {
        user: "",
        region: "",
      },
      department: [
        {
          label: "交通警察支队/交通警察支队",
          value: 1,
        },
        {
          label: "交通警察支队/办公室",
          value: 2,
        },
        {
          label: "交通警察支队/政工科",
          value: 3,
        },
        {
          label: "交通警察支队/财务科",
          value: 4,
        },
        {
          label: "交通秩序管理科/交通秩序管理科",
          value: 5,
        },
        {
          label: "交通秩序管理科/特勤中队",
          value: 6,
        },
        {
          label: "交通秩序管理科/交通设施股",
          value: 7,
        },
        {
          label: "事故处理大队/事故处理大队",
          value: 8,
        },
        {
          label: "车辆管理所/车辆管理所",
          value: 9,
        },
        {
          label: "车辆管理所/政秘股",
          value: 10,
        },
        {
          label: "车辆管理所/车辆管理股",
          value: 11,
        },
        {
          label: "车辆管理所/驾驶员管理",
          value: 12,
        },
        {
          label: "车辆管理所/证照股",
          value: 13,
        },
        {
          label: "车辆管理所/档案管理股",
          value: 14,
        },
        {
          label: "车辆管理所/考试股",
          value: 15,
        },
        {
          label: "直属大队/直属大队",
          value: 16,
        },
        {
          label: "直属大队/政秘股",
          value: 17,
        },
        {
          label: "直属大队/秩序股",
          value: 18,
        },
        {
          label: "直属大队/事故处理股",
          value: 19,
        },
        {
          label: "直属大队/一中队",
          value: 20,
        },
        {
          label: "直属大队/二中队",
          value: 21,
        },
        {
          label: "直属大队/三中队",
          value: 22,
        },
        {
          label: "直属大队/四中队",
          value: 23,
        },
        {
          label: "安源大队/安源大队",
          value: 24,
        },
        {
          label: "安源大队/政秘股",
          value: 25,
        },
        {
          label: "安源大队/秩序股",
          value: 26,
        },
        {
          label: "安源大队/高坑中队",
          value: 27,
        },
        {
          label: "安源大队/青山中队",
          value: 28,
        },
        {
          label: "安源大队/事故处理股",
          value: 29,
        },
        {
          label: "安源大队/安源中队",
          value: 30,
        },
        {
          label: "安源大队/五陂中队",
          value: 31,
        },
        {
          label: "湘东大队/湘东大队",
          value: 32,
        },
        {
          label: "湘东大队/政秘股",
          value: 33,
        },
        {
          label: "湘东大队/车管股",
          value: 34,
        },
        {
          label: "湘东大队/秩序股",
          value: 35,
        },
        {
          label: "湘东大队/事故处理股",
          value: 36,
        },
        {
          label: "湘东大队/老关中队",
          value: 37,
        },
        {
          label: "湘东大队/麻山中队",
          value: 38,
        },
        {
          label: "湘东大队/城区中队",
          value: 39,
        },
        {
          label: "湘东大队/排上中队",
          value: 40,
        },
        {
          label: "湘东大队/白竺中队",
          value: 41,
        },
        {
          label: "开发大队/开发大队",
          value: 42,
        },
        {
          label: "开发大队/政秘股",
          value: 43,
        },
        {
          label: "开发大队/秩序股",
          value: 44,
        },
        {
          label: "开发大队/事故处理股",
          value: 45,
        },
        {
          label: "开发大队/一中队",
          value: 46,
        },
        {
          label: "开发大队/二中队",
          value: 47,
        },
        {
          label: "开发大队/车管股",
          value: 48,
        },
        {
          label: "开发大队/三中队",
          value: 49,
        },
        {
          label: "开发大队/四中队",
          value: 50,
        },
        {
          label: "开发大队/五中队",
          value: 51,
        },
        {
          label: "科技科/科技科",
          value: 52,
        },
        {
          label: "科技科/信息集数股",
          value: 53,
        },
        {
          label: "科技科/交通监控股",
          value: 54,
        },
        {
          label: "法制科/法制科",
          value: 55,
        },
        {
          label: "法制科/法制股",
          value: 56,
        },
        {
          label: "法制科/宣传股",
          value: 57,
        },
        {
          label: "武功山大队/武功山大队",
          value: 58,
        },
        {
          label: "指挥中心/指挥中心",
          value: 59,
        },
      ],
    };
  },
  watch: {
    choice(newVal, oldVal) {
      const oldNode = document.getElementById(String(oldVal));
      oldNode.style.color = "black";
      oldNode.onmouseover = function () {
        this.style.color = "#5a5e66";
      };
      oldNode.onmouseout = function () {
        this.style.color = "black";
      };

      const newNode = document.getElementById(String(newVal));
      // newNode.style.color="rgba(14,76,116,1)"
      newNode.onmouseover = function () {
        this.style.color = "#5a5e99";
      };
      newNode.onmouseout = function () {
        this.style.color = "rgba(14,76,116,1)";
      };
    },
  },
  mounted() {
    this.folk = enums.folk;
    this.gender = enums.gender;
    this.bloodType = enums.bloodType;
    this.isYes = enums.isYes;
    this.accountType = enums.accountType;
    this.postponeReason = enums.postponeReason;
    this.politicalStatus = enums.politicalStatus;
    this.identificationOfAssistantCadres =
      enums.identificationOfAssistantCadres;
    this.managementCategory = enums.managementCategory;
    this.status = enums.status;
    this.personnelType = enums.personnelType;
    this.identity = enums.identity;
    this.maritalStatus = enums.maritalStatus;
    this.healthCondition = enums.healthCondition;
    this.departmentAndPoliceTypeAndStaffPosition =
      enums.departmentAndPoliceTypeAndStaffPosition;
    this.place = enums.place;
    this.rankType = enums.rankType;
    getPoliceInfoById(this.$route.params.id).then((res) => {
      this.basicInfoVoList = res.data;
      this.basicInfoVoList.birthday = getTime(this.basicInfoVoList.birthday);
      this.basicInfoVoList.workJoinDate = getTime(
        this.basicInfoVoList.workJoinDate
      );
      this.basicInfoVoList.policeWorkJoinDate = getTime(
        this.basicInfoVoList.policeWorkJoinDate
      );
      this.basicInfoVoList.dateOfJoiningTheOrganizations = getTime(
        this.basicInfoVoList.dateOfJoiningTheOrganizations
      );
      this.basicInfoVoList.gender = decode.gender[this.basicInfoVoList.gender];
      this.basicInfoVoList.folk = decode.folk[this.basicInfoVoList.folk];
      this.basicInfoVoList.status = decode.status[this.basicInfoVoList.status];
      this.basicInfoVoList.bloodType =
        decode.bloodType[this.basicInfoVoList.bloodType];
      this.basicInfoVoList.isInPoliceOfficerLibrary =
        decode.isYes[this.basicInfoVoList.isInPoliceOfficerLibrary];
      this.basicInfoVoList.personnelType =
        decode.personnelType[this.basicInfoVoList.personnelType];
      this.basicInfoVoList.nativePlace =
        decode.place[this.basicInfoVoList.nativePlace];
      this.basicInfoVoList.birthplace =
        decode.place[this.basicInfoVoList.birthplace];
      this.basicInfoVoList.growingPlace =
        decode.place[this.basicInfoVoList.growingPlace];
      this.basicInfoVoList.accountType =
        decode.accountType[this.basicInfoVoList.accountType];
      this.basicInfoVoList.registerResidenceLocation =
        decode.place[this.basicInfoVoList.registerResidenceLocation];
      this.basicInfoVoList.identity =
        decode.identity[this.basicInfoVoList.identity];
      this.basicInfoVoList.maritalStatus =
        decode.maritalStatus[this.basicInfoVoList.maritalStatus];
      this.basicInfoVoList.isClassified =
        decode.isYes[this.basicInfoVoList.isClassified];
      this.basicInfoVoList.healthCondition =
        decode.healthCondition[this.basicInfoVoList.healthCondition];
      this.basicInfoVoList.postponeReason =
        decode.postponeReason[this.basicInfoVoList.postponeReason];
      this.basicInfoVoList.politicalStatus =
        decode.politicalStatus[this.basicInfoVoList.politicalStatus];
      this.basicInfoVoList.departmentAndPoliceType =
        decode.departmentAndPoliceTypeAndStaffPosition[
          this.basicInfoVoList.departmentAndPoliceType
        ];
      this.basicInfoVoList.staffPosition =
        decode.departmentAndPoliceTypeAndStaffPosition[
          this.basicInfoVoList.staffPosition
        ];
      this.basicInfoVoList.identificationOfAssistantCadres =
        decode.identificationOfAssistantCadres[
          this.basicInfoVoList.identificationOfAssistantCadres
        ];
      this.basicInfoVoList.isAssistantCadres =
        decode.isYes[this.basicInfoVoList.isAssistantCadres];
      this.basicInfoVoList.managementCategory =
        decode.managementCategory[this.basicInfoVoList.managementCategory];
      this.basicInfoVoList.rank = decode.rankType[this.basicInfoVoList.rank];
    });
  },
  methods: {
    goBack() {
      this.$router.push("/basicInfo/staff");
    },
    click(choice) {
      this.choice = choice;
    },
    async getPoliceInfo(id) {
      const res = await getPoliceInfoById(id);
      return res;
    },
    editInfo() {
      this.edit = true;
      this.basicInfoVoListEdit = this.basicInfoVoList;
    },
    async submitPoliceInfo() {
      this.basicInfoVoListEdit.gender = this.getGenderCode(
        this.basicInfoVoListEdit.gender
      );
      this.basicInfoVoListEdit.folk = this.getFolkCode(
        this.basicInfoVoListEdit.folk
      );
      this.basicInfoVoListEdit.birthday = this.getTimeStamp(
        this.basicInfoVoListEdit.birthday
      );
      this.basicInfoVoListEdit.nativePlace = this.getPlaceCode(
        this.basicInfoVoListEdit.nativePlace
      );
      this.basicInfoVoListEdit.bloodType = this.getBloodTypeCode(
        this.basicInfoVoListEdit.bloodType
      );
      this.basicInfoVoListEdit.status = this.getStatusCode(
        this.basicInfoVoListEdit.status
      );
      this.basicInfoVoListEdit.personnelType = this.getPersonnelTypeCode(
        this.basicInfoVoListEdit.personnelType
      );
      this.basicInfoVoListEdit.isInPoliceOfficerLibrary = this.getIsCode(
        this.basicInfoVoListEdit.isInPoliceOfficerLibrary
      );
      this.basicInfoVoListEdit.birthplace = this.getPlaceCode(
        this.basicInfoVoListEdit.birthplace
      );
      this.basicInfoVoListEdit.growingPlace = this.getPlaceCode(
        this.basicInfoVoListEdit.growingPlace
      );
      this.basicInfoVoListEdit.accountType = this.getAccountTypeCode(
        this.basicInfoVoListEdit.accountType
      );
      this.basicInfoVoListEdit.registerResidenceLocation = this.getPlaceCode(
        this.basicInfoVoListEdit.registerResidenceLocation
      );
      this.basicInfoVoListEdit.identity = this.getIdentityCode(
        this.basicInfoVoListEdit.identity
      );
      this.basicInfoVoListEdit.maritalStatus = this.getMaritalStatusCode(
        this.basicInfoVoListEdit.maritalStatus
      );
      this.basicInfoVoListEdit.isClassified = this.getIsCode(
        this.basicInfoVoListEdit.isClassified
      );
      this.basicInfoVoListEdit.healthCondition = this.getHealthConditionCode(
        this.basicInfoVoListEdit.healthCondition
      );
      this.basicInfoVoListEdit.postponeReason = this.getPostponeReasonCode(
        this.basicInfoVoListEdit.postponeReason
      );
      this.basicInfoVoListEdit.rank = this.getRankCode(
        this.basicInfoVoListEdit.rank
      );
      // 工作信息
      this.basicInfoVoListEdit.workJoinDate = this.getTimeStamp(
        this.basicInfoVoListEdit.workJoinDate
      );
      this.basicInfoVoListEdit.policeWorkJoinDate = this.getTimeStamp(
        this.basicInfoVoListEdit.policeWorkJoinDate
      );
      // 政治面貌
      this.basicInfoVoListEdit.politicalStatus = this.getPoliticalStatusCode(
        this.basicInfoVoListEdit.politicalStatus
      );
      this.basicInfoVoListEdit.dateOfJoiningTheOrganizations =
        this.getTimeStamp(
          this.basicInfoVoListEdit.dateOfJoiningTheOrganizations
        );
      // 人事关系
      this.basicInfoVoListEdit.departmentAndPoliceType =
        this.getDepartmentAndPoliceTypeCode(
          this.basicInfoVoListEdit.departmentAndPoliceType
        );
      this.basicInfoVoListEdit.staffPosition = this.getStaffPositionCode(
        this.basicInfoVoListEdit.staffPosition
      );
      this.basicInfoVoListEdit.identificationOfAssistantCadres =
        this.getIdentificationOfAssistantCadresCode(
          this.basicInfoVoListEdit.identificationOfAssistantCadres
        );
      this.basicInfoVoListEdit.isAssistantCadres = this.getIsCode(
        this.basicInfoVoListEdit.isAssistantCadres
      );
      this.basicInfoVoListEdit.managementCategory =
        this.getManagementCategoryCode(
          this.basicInfoVoListEdit.managementCategory
        );
      this.basicInfoVoListEdit.rank = this.getRankCode(
        this.basicInfoVoListEdit.rank
      );
      const res = await updateBasicInfo(this.basicInfoVoListEdit);
      if (res.code === 1) {
        this.$router.go(0);
      }
    },
    getGenderCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.gender, value);
        return res;
      } else {
        res = value;
        return res;
      }
    },
    getFolkCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.folk, value);
        return res;
      } else {
        res = value;
        return res;
      }
    },
    getPlaceCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.place, value);
        return res;
      } else {
        res = getCode(value);
        return res;
      }
    },
    getBloodTypeCode(value) {
      let res = "";
      if (parseInt(value).toString() === "NaN") {
        res = findCode(decode.bloodType, value);
        return res;
      } else {
        res = value;
        return res;
      }
    },
    getTimeStamp(value) {
      let res = "";
      if (Number(value).toString() === "NaN") {
        const str = value.replace(/-/g, "/");
        res = new Date(str).getTime();
        return res;
      } else {
        res = value;
        return res;
      }
    },
    getStatusCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.status, value);
        return res;
      } else {
        res = getCode(value);
        return res;
      }
    },
    getPersonnelTypeCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.personnelType, value);
        return res;
      } else {
        res = getCode(value);
        return res;
      }
    },
    getIsCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.isYes, value);
        return res;
      } else {
        res = value;
        return res;
      }
    },
    getAccountTypeCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.accountType, value);
        return res;
      } else {
        res = value;
        return res;
      }
    },
    getIdentityCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.identity, value);
        return res;
      } else {
        res = getCode(value);
        return res;
      }
    },
    getMaritalStatusCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.maritalStatus, value);
        return res;
      } else {
        res = getCode(value);
        return res;
      }
    },
    getHealthConditionCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.healthCondition, value);
        return res;
      } else {
        res = getCode(value);
        return res;
      }
    },
    getPostponeReasonCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.postponeReason, value);
        return res;
      } else {
        res = value;
        return res;
      }
    },
    getRankCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.rankType, value);
        return res;
      } else {
        res = value;
        return res;
      }
    },
    getPoliticalStatusCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.politicalStatus, value);
        return res;
      } else {
        res = value;
        return res;
      }
    },
    getDepartmentAndPoliceTypeCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.departmentAndPoliceTypeAndStaffPosition, value);
        return res;
      } else {
        res = getCode(value);
        return res;
      }
    },
    getStaffPositionCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.departmentAndPoliceTypeAndStaffPosition, value);
        return res;
      } else {
        res = getCode(value);
        return res;
      }
    },
    getIdentificationOfAssistantCadresCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.identificationOfAssistantCadres, value);
        return res;
      } else {
        res = value;
        return res;
      }
    },
    getManagementCategoryCode(value) {
      let res = "";
      if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        res = findCode(decode.managementCategory, value);
        return res;
      } else {
        res = value;
        return res;
      }
    },
  },
};
</script>

<style scoped>
.buttons {
  margin-top: 5%;
  display: flex;
  font-size: 20px;
}
.button-area {
  width: 70%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
.buttons button {
  width: 15%;
  height: 60px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
}
.buttons button:hover {
  color: #5a5e66;
}
.first {
  color: rgba(14, 76, 116, 1);
  border-radius: 10px 0 0 10px;
}
.last {
  border-radius: 0 10px 0 0;
}
.seq {
  display: flex;
  align-items: center;
  background-color: #efefef;
}
.policeInfo {
  border: #5a5e66 solid;
  border-width: thin;
  border-radius: 10px;
  width: 90%;
  padding: 2%;
  margin-left: 5%;
}
.operate {
  display: flex;
  justify-content: center;
}
.el-button {
  background-color: #5a5e66;
  border: none;
  width: 10%;
  margin-top: 10px;
}
.el-button:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
